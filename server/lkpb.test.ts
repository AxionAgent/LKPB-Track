import { describe, expect, it } from "vitest";
import { __parseLkpbCsvForTests, DEFAULT_LKPB_SOURCES, formatIdDate, normalizePoolName, parseLkpbCsv } from "./lkpb";

const detailFixture = [
  "SUMMARY DETAIL LKPB",
  "NO,NO DO,NAMA CUSTOMER,TANGGAL JALUR AWAL,TANGGAL REINSTALL,SLA BERJALAN,STATUS,KATEGORI LKPB,REASON",
  '1,5A.XH.000016,MITRA PROPERTI,6 Agu 2026,5 Sep 2026,29 Day,FINISH,CACAT,"KULIT PADA BAGIAN SANDARAN SOFA SOBEK"',
  '2,D7.XF.000605,SOPHIA,21 Agu 2026,20 Sep 2026,14 Day,OPEN,CACAT,"BARANG TUGU MASIH CACAT"',
  '3,5A.XG.000053,GESIA 1,13 Jul 2026,12 Agu 2026,53 Day,OPEN,CACAT VENDOR,"TIDAK ADA CANTOLAN, PART A"',
].join("\n");

const poolFixture = [
  '"No.","Pool Name","Achv","Tanggal","Total Jalur","Total Team","Prod.","Bobot","Pending Resch","Rusong","Tungkom","Brg.","Inst.","Total","Open ","Lanjut Install ","Cancel ","LKPB ","(n/a) ","Instalasi Target","Real."',
  '"1","POOL BALIKPAPAN","100,00%","01 Feb 2025","38","5","8","64","3","-","8","1","-","12","-","1","-","1","-","24","24"',
  '"2","POOL BALIKPAPAN","100,00%","02 Feb 2025","27","4","7","66","3","-","1","-","-","4","-","-","-","1","-","22","22"',
].join("\n");

describe("LKPB sheet parser", () => {
  it("extracts case records with server-computed week, month, and SLA from the Detail LKPB layout", () => {
    const parsed = __parseLkpbCsvForTests(detailFixture);
    expect(parsed.records).toHaveLength(3);
    const [r0, r1, r2] = parsed.records;
    expect(r2).toMatchObject({ noDo: "5A.XG.000053", customer: "GESIA 1", status: "OPEN", category: "CACAT VENDOR", year: "2026", pool: "Singkawang", month: 202607 });
    // slaDays is server-computed from "now", so just assert it's > 0
    expect(r2.slaDays).toBeGreaterThan(0);
    expect(r0).toMatchObject({ noDo: "5A.XH.000016", week: 2, month: 202608 });
    expect(r1).toMatchObject({ noDo: "D7.XF.000605", week: 4, month: 202608 });
    expect(parsed.records[0].jalurAwalDate).toBe("2026-08-06");
  });

  it("extracts daily pool metrics from 2025 pool spreadsheets", () => {
    const source2025 = { sourceKey: "2025-balikpapan", year: "2025", pool: "Pool Balikpapan", label: "Feb 2025 · Pool Balikpapan", spreadsheetId: "x", sheetName: "Detail LKPB" };
    const parsed = parseLkpbCsv(poolFixture, source2025);
    expect(parsed.records).toHaveLength(0);
    expect(parsed.poolSummary).toMatchObject({ year: "2025", pool: "Pool Balikpapan", days: 2, lkpb: 2, target: 46, real: 46, achievement: 100 });
  });

  it("returns only Detail LKPB records and ignores any weekly block in the sheet", () => {
    const csvWithWeekly = [
      "STATUS,W1,W2,W3,W4,,W5",
      "OPEN,0,0,0,1,,0",
      "FINISH,1,0,0,1,,0",
      ",1-6,7-13,14-20,21-27,,28-31",
      "SUMMARY DETAIL LKPB",
      "NO,NO DO,NAMA CUSTOMER,TANGGAL JALUR AWAL,TANGGAL REINSTALL,SLA BERJALAN,STATUS,KATEGORI LKPB,REASON",
      "1,DO-1,CUSTOMER,1 Sep 2026,2 Sep 2026,1 Day,OPEN,CACAT,REASON",
    ].join("\n");
    const parsed = __parseLkpbCsvForTests(csvWithWeekly);
    expect(parsed.records).toHaveLength(1);
    expect(parsed.records[0]).toMatchObject({ noDo: "DO-1", week: 1, month: 202609 });
  });

  it("normalizePoolName strips prefix and trims whitespace", () => {
    expect(normalizePoolName("Pool Singkawang")).toBe("Singkawang");
    expect(normalizePoolName("POOL BALIKPAPAN")).toBe("BALIKPAPAN");
    expect(normalizePoolName("Singkawang")).toBe("Singkawang");
    expect(normalizePoolName("  Pool   Cilegon  ")).toBe("Cilegon");
  });

  it("dedup key collapses pool-name variations on identical NO DO", () => {
    // simulate dedup logic: key = normalizedPool|noDo|month
    const key = (pool: string, noDo: string, month: number) =>
      `${normalizePoolName(pool).toLowerCase()}|${noDo.trim().toLowerCase()}|${month}`;
    expect(key("Pool Singkawang", "5A.XG.000053", 202607))
      .toBe(key("Singkawang", "5A.XG.000053", 202607));
    expect(key("POOL cilegon", "ABC", 202606))
      .toBe(key("Cilegon", "abc", 202606));
    // different month → different key
    expect(key("Singkawang", "5A.XG.000053", 202607))
      .not.toBe(key("Singkawang", "5A.XG.000053", 202608));
  });

  it("parses DD/MM/YYYY numeric dates in Jalur Awal", () => {
    const csvNum = [
      "SUMMARY DETAIL LKPB",
      "NO,NO DO,NAMA CUSTOMER,TANGGAL JALUR AWAL,TANGGAL REINSTALL,SLA BERJALAN,STATUS,KATEGORI LKPB,REASON",
      "1,DO-1,CUSTOMER,23/7/2026,30/7/2026,7 Day,FINISH,CACAT,REASON",
    ].join("\n");
    const parsed = __parseLkpbCsvForTests(csvNum);
    expect(parsed.records).toHaveLength(1);
    expect(parsed.records[0].jalurAwalDate).toBe("2026-07-23");
    expect(parsed.records[0].sla).toMatch(/^\d+ Day$/);
    expect(parsed.records[0].sla).not.toBe("FINISH");
  });

  it("standardizes Jalur Awal & Reinstall to 'D MonthFull YYYY' regardless of source variant", () => {
    const csvMixed = [
      "SUMMARY DETAIL LKPB",
      "NO,NO DO,NAMA CUSTOMER,TANGGAL JALUR AWAL,TANGGAL REINSTALL,SLA BERJALAN,STATUS,KATEGORI LKPB,REASON",
      "1,DO-1,A,6 Sep 2026,10 Sep 2026,4 Day,FINISH,CACAT,r1",
      "2,DO-2,B,6 September 2026,10 Sep 2026,4 Day,FINISH,CACAT,r2",
      "3,DO-3,C,23/7/2026,30/7/2026,7 Day,FINISH,CACAT,r3",
      "4,DO-4,D,6 Agu 2026,8 Agu 2026,2 Day,FINISH,CACAT,r4",
      "5,DO-5,E,6 Mei 2026,8 Jun 2026,2 Day,FINISH,CACAT,r5",
    ].join("\n");
    const parsed = __parseLkpbCsvForTests(csvMixed);
    expect(parsed.records).toHaveLength(5);
    expect(parsed.records[0].jalurAwal).toBe("6 September 2026");
    expect(parsed.records[0].reinstall).toBe("10 September 2026");
    expect(parsed.records[1].jalurAwal).toBe("6 September 2026");
    expect(parsed.records[2].jalurAwal).toBe("23 July 2026");
    expect(parsed.records[3].jalurAwal).toBe("6 August 2026");
    expect(parsed.records[4].jalurAwal).toBe("6 May 2026");
    expect(parsed.records[4].reinstall).toBe("8 June 2026");
  });

  it("formatIdDate produces D MonthFull YYYY", () => {
    expect(formatIdDate(new Date(2026, 8, 5))).toBe("5 September 2026");
    expect(formatIdDate(new Date(2026, 0, 1))).toBe("1 January 2026");
    expect(formatIdDate(new Date(2026, 11, 31))).toBe("31 December 2026");
  });

  it("parses English month names in Jalur Awal (e.g. '2 May 2026')", () => {
    const csvEng = [
      "SUMMARY DETAIL LKPB",
      "NO,NO DO,NAMA CUSTOMER,TANGGAL JALUR AWAL,TANGGAL REINSTALL,SLA BERJALAN,STATUS,KATEGORI LKPB,REASON",
      "1,DO-1,CUSTOMER,2 May 2026,10 May 2026,8 Day,FINISH,CACAT,REASON",
      "2,DO-2,CUSTOMER,15 Aug 2026,20 Aug 2026,5 Day,FINISH,CACAT,REASON",
    ].join("\n");
    const parsed = __parseLkpbCsvForTests(csvEng);
    expect(parsed.records).toHaveLength(2);
    expect(parsed.records[0].jalurAwalDate).toBe("2026-05-02");
    expect(parsed.records[0].sla).toMatch(/^\d+ Day$/);
    expect(parsed.records[0].sla).not.toBe("FINISH");
    expect(parsed.records[1].jalurAwalDate).toBe("2026-08-15");
  });
});
