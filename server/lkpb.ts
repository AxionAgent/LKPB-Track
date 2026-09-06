export const LKPB_SOURCE_URL = "https://docs.google.com/spreadsheets/d/1dv47cVgG4-mCR17HN5tUicViQDiwt-4DUVrMOR97CJE/edit?gid=753848820#gid=753848820";
const ORIGINAL_SAMPLE_ID = "10yajj552DnuKf0-rroYqcdyET60WjTCe58PknW7L6Dw";
const CSV_BASE = "https://docs.google.com/spreadsheets/d";

export type LkpbRecord = { no: number; noDo: string; customer: string; jalurAwal: string; jalurAwalDate: string | null; reinstall: string; sla: string; slaDays: number; status: string; category: string; reason: string; year: string; pool: string; week: number; month: number };
export type PoolSummary = { year: string; pool: string; sourceKey: string; label: string; days: number; lkpb: number; open: number; target: number; real: number; achievement: number };
export type PoolIssue = { pool: string; year: string; total: number; open: number; finish: number; avgSlaDays: number; overdue: number; topCategory: string };
export type LkpbSource = { sourceKey: string; year: string; pool: string; label: string; spreadsheetId: string; sheetName: string };
export type LkpbDashboard = {
  records: LkpbRecord[];
  summary: { total: number; open: number; finish: number; completionRate: number; avgSlaDays: number; overdue: number };
  categories: Array<{ name: string; count: number; percentage: number }>;
  slaBuckets: Array<{ name: string; count: number; percentage: number; tone: "good" | "watch" | "risk" }>;
  poolSummaries: PoolSummary[]; poolIssues: PoolIssue[]; months: number[]; years: string[]; pools: string[]; sources: Array<LkpbSource & { enabled: number }>;
  sourceUrl: string; lastSyncedAt: string; isFallback: boolean;
};

const source = (sourceKey: string, year: string, pool: string, label: string, spreadsheetId: string): LkpbSource => ({ sourceKey, year, pool, label, spreadsheetId, sheetName: "Detail LKPB" });
export const DEFAULT_LKPB_SOURCES: LkpbSource[] = [
  source("2026-master", "2026", "Singkawang", "Sep 2026 · Pool Singkawang", ORIGINAL_SAMPLE_ID),
  source("2026-balikpapan-jan", "2026", "Balikpapan", "Januari 2026 · Pool Balikpapan", "1-oI0uPu_jlY_Ega_bw_pLpgK103D2PBs3L_35oo3nYY"),
  source("2026-balikpapan-feb", "2026", "Balikpapan", "Februari 2026 · Pool Balikpapan", "17C6NuvfldWNKrywo3RXn27O_HFeja7QxNdlQ1QiL5a0"),
  source("2026-balikpapan-mar", "2026", "Balikpapan", "Maret 2026 · Pool Balikpapan", "14vsaFvoEIFZ5S0uGJLR31A3z2bQCbX8wDE6KP-SiiAw"),
  source("2026-balikpapan-apr", "2026", "Balikpapan", "April 2026 · Pool Balikpapan", "1moWOh2w_C3XDTjYiL0vBjoMRXgZLwy2JxV9EVxUcTWY"),
  source("2026-balikpapan-mei", "2026", "Balikpapan", "Mei 2026 · Pool Balikpapan", "1ZcDHTBvY0XAuzg5vuXcRrJASHjkOSMvsi0vvtqKRtpo"),
  source("2026-balikpapan-jun", "2026", "Balikpapan", "Juni 2026 · Pool Balikpapan", "1E4Oc3N8oGMIkX5k7fI5sW7etq0L_iP5Mtou2_sIdIqQ"),
  source("2026-balikpapan-jul", "2026", "Balikpapan", "Juli 2026 · Pool Balikpapan", "1pUD2SKxiSM4wbgJiPv1N59igqK5YWXCNG2MKVEoB8MQ"),
  source("2026-balikpapan-agu", "2026", "Balikpapan", "Agustus 2026 · Pool Balikpapan", "1t1OporFiXtPxmAP2nKEAiZR85uHa90IhehrdInhxeIk"),
  source("2026-balikpapan-sep", "2026", "Balikpapan", "September 2026 · Pool Balikpapan", "1Bp-mxoU3IWzpn7hx4RyABst-uI0-k_3cX3aCd_Ilw-4"),
  source("2026-banjarmasin-jan", "2026", "Banjarmasin", "Januari 2026 · Pool Banjarmasin", "1ZRwiCZYlQG0bWuM3Ft8wbMEVxyrJvEUQj119zzuhquI"),
  source("2026-banjarmasin-feb", "2026", "Banjarmasin", "Februari 2026 · Pool Banjarmasin", "1s6OvcTMu7eP-VKi7MZwYKt_vv14HRb3sfm-dsJ--6VU"),
  source("2026-banjarmasin-mar", "2026", "Banjarmasin", "Maret 2026 · Pool Banjarmasin", "1-1l5nrGFIfRC7MmGGj6oZ5PjYSlAP9VBFEVmVaC2ngE"),
  source("2026-banjarmasin-apr", "2026", "Banjarmasin", "April 2026 · Pool Banjarmasin", "1RdQAGlGQJnyKaARsj-0zo9oKZ3t6GGmKCXbzO6PSbcI"),
  source("2026-banjarmasin-mei", "2026", "Banjarmasin", "Mei 2026 · Pool Banjarmasin", "1kJrlEf-m5M6IF__rtDWx9HGxCwj4Kj5F-6Oz_ATlPjg"),
  source("2026-banjarmasin-jun", "2026", "Banjarmasin", "Juni 2026 · Pool Banjarmasin", "1q1YNUNCYMyahK-ckUawlQh7IKQQunFAycOW2dVS3uAQ"),
  source("2026-banjarmasin-jul", "2026", "Banjarmasin", "Juli 2026 · Pool Banjarmasin", "1p3tVPPevmb-zR9hzDmQBmTnmCQJ5zBP6YSau4goqAbc"),
  source("2026-banjarmasin-agu", "2026", "Banjarmasin", "Agustus 2026 · Pool Banjarmasin", "1_U4Mwe1BtU3Fh_aoe44piVD1JMjUqcusR_d4hG1cedI"),
  source("2026-banjarmasin-sep", "2026", "Banjarmasin", "September 2026 · Pool Banjarmasin", "1KAlfIOcl1jePRNV5G7zkrUDnR3dXL-ogaCAsvv4_Vr4"),
  source("2026-banten-jan", "2026", "Banten", "Januari 2026 · Pool Banten", "1aZTgDIYhw44j-v3KZIrkvIBaBlFoFXXYAp93vEBnh8c"),
  source("2026-banten-feb", "2026", "Banten", "Februari 2026 · Pool Banten", "1kP1bR8kiF2fywq5D1qaHntkOqAE6Nkutbq_7ZNg2sVg"),
  source("2026-banten-mar", "2026", "Banten", "Maret 2026 · Pool Banten", "17UoSyVlSHdL-h3vwuYl9RXkcjdf3xpALfrooHq--E2s"),
  source("2026-banten-apr", "2026", "Banten", "April 2026 · Pool Banten", "1eajbLrV0O-_bpX0fmeOY7r9Nj1DwHY6GYH2JDJeG5s4"),
  source("2026-banten-mei", "2026", "Banten", "Mei 2026 · Pool Banten", "19Nd8OeH5-VmA40MJl8qOsCMolqPuzLfy0BRK0OoTbuU"),
  source("2026-banten-jun", "2026", "Banten", "Juni 2026 · Pool Banten", "1Uuo5SA9bbDcWig8vdSszZa0-j0mSJha2RTtVZo9aQ58"),
  source("2026-banten-jul", "2026", "Banten", "Juli 2026 · Pool Banten", "1I7ni61kYQFjK4-NnLksiKqH99wBOzWDRd5r-yZlBDvM"),
  source("2026-banten-agu", "2026", "Banten", "Agustus 2026 · Pool Banten", "10RuPuSdqqLetSv2GygutZnqdBvbdZafRV2veUKAW5GY"),
  source("2026-banten-sep", "2026", "Banten", "September 2026 · Pool Banten", "1tTTg_kFX4clhHRnX8zh7b32s6MgZJPuo2uQ4M5WGbx4"),
  source("2026-cilegon-jan", "2026", "Cilegon", "Januari 2026 · Pool Cilegon", "1BNuPxeWmwyOUxMyjMyHV2fKAN-3uZV0YXcNa2o3rMKM"),
  source("2026-cilegon-feb", "2026", "Cilegon", "Februari 2026 · Pool Cilegon", "1tAuR_aY9xzhD_MZCr8mNJjQPama8646EMc-F34YstCE"),
  source("2026-cilegon-mar", "2026", "Cilegon", "Maret 2026 · Pool Cilegon", "1YBv6EkZsQkkGAIACjC9-ssQNK4_8rcf3oB8f7ejyML4"),
  source("2026-cilegon-apr", "2026", "Cilegon", "April 2026 · Pool Cilegon", "1-LTANZY9NPc1R24tY84VnpJipvRkLn0C0zhgWseWEoE"),
  source("2026-cilegon-mei", "2026", "Cilegon", "Mei 2026 · Pool Cilegon", "1p5K7pLHfLGouzD5y3bzAdgYlCIDrcJyIPG5QEJw44cQ"),
  source("2026-cilegon-jun", "2026", "Cilegon", "Juni 2026 · Pool Cilegon", "1QvMOJzYEFVg1MIA1V6SeX3xtffHyu5_fuBQ2T4CB6FY"),
  source("2026-cilegon-jul", "2026", "Cilegon", "Juli 2026 · Pool Cilegon", "1k-THcwc59P6_65oW2nYvYppFr_aCkkUOwSLevhUgFGw"),
  source("2026-cilegon-agu", "2026", "Cilegon", "Agustus 2026 · Pool Cilegon", "1Nme4FfB41VIVigqlru4me2QPTVkYuKkxUujHIc0PGf0"),
  source("2026-cilegon-sep", "2026", "Cilegon", "September 2026 · Pool Cilegon", "1IJax9ePEkoOVHLHh6mS5PsDkR-LLjRqEnGX5sbrX6iw"),
  source("2026-madiun-jan", "2026", "Madiun", "Januari 2026 · Pool Madiun", "10t3SWk0N-s5RNOoo-rUSgcO_DUPrR6ulcTYswyREzmY"),
  source("2026-madiun-feb", "2026", "Madiun", "Februari 2026 · Pool Madiun", "1cyhEcDbxUxyl5CznW-giug5OrKXE_2tViYH_QFhJjFk"),
  source("2026-madiun-mar", "2026", "Madiun", "Maret 2026 · Pool Madiun", "1RTtHAxr3wYVwfBZ2B2LvreRltsVra8LDJiJr1YY0XQI"),
  source("2026-madiun-apr", "2026", "Madiun", "April 2026 · Pool Madiun", "1f0XWvd1A73jZtxD4WBv-BquBPU1POhw4Nu4v5SBGChs"),
  source("2026-madiun-mei", "2026", "Madiun", "Mei 2026 · Pool Madiun", "1Bv0Jy8S_L21vofXAAlwd0j3PYDrxLGU3IzGzf5I54QU"),
  source("2026-madiun-jun", "2026", "Madiun", "Juni 2026 · Pool Madiun", "1va88-3V4_Y648SGcJem5MSux9Q-qZDmdZSvr4rbBCfs"),
  source("2026-madiun-jul", "2026", "Madiun", "Juli 2026 · Pool Madiun", "1mSjxbrveKWc5XsxFybqzsivr8R6U52BKpRP0PECjlT0"),
  source("2026-madiun-agu", "2026", "Madiun", "Agustus 2026 · Pool Madiun", "1do9iix2TdCERIG5qzSNZ87gK_ZFv7SM7YBzsADOiJdU"),
  source("2026-madiun-sep", "2026", "Madiun", "September 2026 · Pool Madiun", "1r0TwpG13HbEuZJsRqSsUqaDYBtJ-D5cORSvMLqoliTQ"),
  source("2026-palangkaraya-jan", "2026", "Palangkaraya", "Januari 2026 · Pool Palangkaraya", "1Xsc0im9n33Tt5SZPPvp68qGD7MYgxRRIjRTDkMrpSrk"),
  source("2026-palangkaraya-feb", "2026", "Palangkaraya", "Februari 2026 · Pool Palangkaraya", "1tp89URh-59YlygcPE1qY_CQxNp2tvMIuIULq1XJ6EyM"),
  source("2026-palangkaraya-mar", "2026", "Palangkaraya", "Maret 2026 · Pool Palangkaraya", "1mCxV0oNeoSBQrFY5OtDi8Kiudjy5jNxPEtyxDNmW24c"),
  source("2026-palangkaraya-apr", "2026", "Palangkaraya", "April 2026 · Pool Palangkaraya", "1GkLxuol44zGEB2oQVtqxfnpP8c6zUrbXFlzJDPjgLY8"),
  source("2026-palangkaraya-mei", "2026", "Palangkaraya", "Mei 2026 · Pool Palangkaraya", "1TEmy0-qMyFDf97q7EWSnbDDidvKjdjXRaffev9eVjLE"),
  source("2026-palangkaraya-jun", "2026", "Palangkaraya", "Juni 2026 · Pool Palangkaraya", "1zbMxfoIkGo6y27WCd-Pxu3I3NLKpBZlPDcrFYwBxfGc"),
  source("2026-palangkaraya-jul", "2026", "Palangkaraya", "Juli 2026 · Pool Palangkaraya", "1YkgR1AA8funBEcyABgoTM7e5TW5qaJlXreLIRD3HxXA"),
  source("2026-palangkaraya-agu", "2026", "Palangkaraya", "Agustus 2026 · Pool Palangkaraya", "1n96oEBnkH_Mgsvz4zALfjC1w0Ef7kwRSVfSIyfboKdU"),
  source("2026-palangkaraya-sep", "2026", "Palangkaraya", "September 2026 · Pool Palangkaraya", "1y9W6arr3bfygN1ksyfK_eyXN0PlXPzqb8wZvCcIXd2U"),
  source("2026-pontianak-jan", "2026", "Pontianak", "Januari 2026 · Pool Pontianak", "1Vk2eTBrb7OkotD3eHZZtsOlqdtBtxO7-z7CDcs3oyi4"),
  source("2026-pontianak-feb", "2026", "Pontianak", "Februari 2026 · Pool Pontianak", "1910UaVvXRc_Mfl9C4Q1Wo4RqBqTLhWBspClIJFRff1w"),
  source("2026-pontianak-mar", "2026", "Pontianak", "Maret 2026 · Pool Pontianak", "1pHXRApMjpgy1xEPWZNiJA-ajJwXKYkQKQmoCa6z3IGg"),
  source("2026-pontianak-apr", "2026", "Pontianak", "April 2026 · Pool Pontianak", "1dXxaT2mSHolYzOJFZ2ssuO6SPLLL5RbpKuqWg_RTQJE"),
  source("2026-pontianak-mei", "2026", "Pontianak", "Mei 2026 · Pool Pontianak", "1Lx2i7YsfeS-Rih42VeDjYq3BkhHr-z5ymf8Yc-bCCH0"),
  source("2026-pontianak-jun", "2026", "Pontianak", "Juni 2026 · Pool Pontianak", "1PiGT4FlYL7XlSzflEjI2b-Vk8eqCy6aPwWILQx9cAYo"),
  source("2026-pontianak-jul", "2026", "Pontianak", "Juli 2026 · Pool Pontianak", "1Jj58hIHuSnvMQprG88FefWtQSxs76WzpUiCyIFMg6Go"),
  source("2026-pontianak-agu", "2026", "Pontianak", "Agustus 2026 · Pool Pontianak", "1fMMuO6Nb3wiidTx3edOtllqQanagWe4PRvp_-x8drqk"),
  source("2026-pontianak-sep", "2026", "Pontianak", "September 2026 · Pool Pontianak", "1vyWNRGsPJ3zxG0_lrDLsAKkXgGCPA8yD2myKyvGFgLQ"),
  source("2026-samarinda-jan", "2026", "Samarinda", "Januari 2026 · Pool Samarinda", "15MyTpH-rlLSwBEpGV1eP58f53AOhgoNkOc_Yy5KSKaI"),
  source("2026-samarinda-feb", "2026", "Samarinda", "Februari 2026 · Pool Samarinda", "1KHvxxQoUvKPsan60SQqepvYiiLfrW_wSbq2dHdqqFWg"),
  source("2026-samarinda-mar", "2026", "Samarinda", "Maret 2026 · Pool Samarinda", "1_-fAnjjld7g68KYd7untaX5FwKH5zqtF1t9x11xqcDM"),
  source("2026-samarinda-apr", "2026", "Samarinda", "April 2026 · Pool Samarinda", "1GNayu41jtagdJDG4oq4x1Ad2l5LKu31pnyHrQlp_feo"),
  source("2026-samarinda-mei", "2026", "Samarinda", "Mei 2026 · Pool Samarinda", "1KIhKU3cMM2l4jwhOsf6K4_Yd-bEsEXVfzHeDNHJEw0M"),
  source("2026-samarinda-jun", "2026", "Samarinda", "Juni 2026 · Pool Samarinda", "1EAdpfjWLaESbp11BZRJ8ObjdjBt2yYRiS-XN-tvGCjc"),
  source("2026-samarinda-jul", "2026", "Samarinda", "Juli 2026 · Pool Samarinda", "1dEQccZH5Y3rEAsITuIEQRd4exGlnjpXF37LaYfWfcd8"),
  source("2026-samarinda-agu", "2026", "Samarinda", "Agustus 2026 · Pool Samarinda", "1Mu9OYPXw0lswO7RzX87BuoRPvLIcU_1NpLUto2Xbtko"),
  source("2026-samarinda-sep", "2026", "Samarinda", "September 2026 · Pool Samarinda", "15GXFLwOzGPikKYCiI6vb-4I4Ar9imIYtfu6H_QUJ-bw"),
  source("2026-singkawang-jan", "2026", "Singkawang", "Januari 2026 · Pool Singkawang", "1xlDAikoiZwATIiv08DY8GGsyNN-cQrS0psocFHUqT4M"),
  source("2026-singkawang-feb", "2026", "Singkawang", "Februari 2026 · Pool Singkawang", "1HxbUXLiXnaaSJDU_5tbCRcMs6iSRLkYyEg1BYSvft3M"),
  source("2026-singkawang-mar", "2026", "Singkawang", "Maret 2026 · Pool Singkawang", "1LmOJ7MAPjaoMd7aJ2IGOneUAN-_0C4kmXk9OXL1ZGQk"),
  source("2026-singkawang-apr", "2026", "Singkawang", "April 2026 · Pool Singkawang", "1Kqnef5aq4i0UsO3Y75IYqDMcDD-TmYh0TMpxIRawq4A"),
  source("2026-singkawang-mei", "2026", "Singkawang", "Mei 2026 · Pool Singkawang", "1_WeRlHzzshSAlRwdVfoeNNx6xixfn6ArAd5S85LxnCg"),
  source("2026-singkawang-jun", "2026", "Singkawang", "Juni 2026 · Pool Singkawang", "17X-4C21GubSXnet2uI1XCtEtsbg1hQaWdPtw6SV63jI"),
  source("2026-singkawang-jul", "2026", "Singkawang", "Juli 2026 · Pool Singkawang", "1-kWaoaNUqive7g09ddPwu7yD3JVrxyZOkXMtgcvSVEE"),
  source("2026-singkawang-agu", "2026", "Singkawang", "Agustus 2026 · Pool Singkawang", "1lpiHvWrdj5eyTHqYzgkcWjz9ch-1YGoPXIK2CWwYoHk"),
  source("2026-singkawang-sep", "2026", "Singkawang", "September 2026 · Pool Singkawang", "10yajj552DnuKf0-rroYqcdyET60WjTCe58PknW7L6Dw"),
  source("2026-solo-jan", "2026", "Solo", "Januari 2026 · Pool Solo", "1n22StTTNRGDOFtshvRixOK9ZdvWYoZdfLQb_8eDfeZU"),
  source("2026-solo-feb", "2026", "Solo", "Februari 2026 · Pool Solo", "1RXe_a05NE-eAqPqGi0XOpv-I5Zf3-cZ0_fkMWwssnRQ"),
  source("2026-solo-mar", "2026", "Solo", "Maret 2026 · Pool Solo", "1YqShUxL46f7h2-tuMzhJWlHp61nZqGttthFQIcR6BP0"),
  source("2026-solo-apr", "2026", "Solo", "April 2026 · Pool Solo", "16ArYQd-TQ4wOpItxVKSnQ2T8CCoYFr_qvnLFGuBOou4"),
  source("2026-solo-mei", "2026", "Solo", "Mei 2026 · Pool Solo", "1WrVz_96JpPKHlb7t_5b97RrqYD422gnwxMXyxIEQ1p0"),
  source("2026-solo-jun", "2026", "Solo", "Juni 2026 · Pool Solo", "11CT0STt0c96CjX-CaYEOW__XoJi_7ysZpcYifwj8WFY"),
  source("2026-solo-jul", "2026", "Solo", "Juli 2026 · Pool Solo", "1fg7Dvoj54F9bUHhByWqebyLdLN3lGOgbm9CWc6-EdKY"),
  source("2026-solo-agu", "2026", "Solo", "Agustus 2026 · Pool Solo", "1ZNwfWmShlR0VVQzMrzn01_2DMCgcehVuYdib37xOpDc"),
  source("2026-solo-sep", "2026", "Solo", "September 2026 · Pool Solo", "1CyK0AxM1rhc2DK5uazP3cSJRBu_fynu-tSuLJf6jtSU"),
  source("2026-tarakan-jan", "2026", "Tarakan", "Januari 2026 · Pool Tarakan", "149z9_oeZQNlr1EfFe5OrusEXtQfMgrLUr1gqk8QqEsc"),
  source("2026-tarakan-feb", "2026", "Tarakan", "Februari 2026 · Pool Tarakan", "1oe9m7uMC56j1ua06AQpCpb5swRI6lSmgKfAsTHqKGRk"),
  source("2026-tarakan-mar", "2026", "Tarakan", "Maret 2026 · Pool Tarakan", "1EN3o_KmTpXnPngFoFzLo5caebULY-DvxG_eDB4JSfmU"),
  source("2026-tarakan-apr", "2026", "Tarakan", "April 2026 · Pool Tarakan", "17mI1WFjXSbEbWARsSokkErRdAIVKwIkLY96AvNd3VC4"),
  source("2026-tarakan-mei", "2026", "Tarakan", "Mei 2026 · Pool Tarakan", "173eadis3o3sa9rJ03xP5snUMGJGuoKZlwsaqiwwVxGE"),
  source("2026-tarakan-jun", "2026", "Tarakan", "Juni 2026 · Pool Tarakan", "177sRZ4fmQC9AZVYzfFbNrAGt7nSuY_v1-j1n_BzGHwY"),
  source("2026-tarakan-jul", "2026", "Tarakan", "Juli 2026 · Pool Tarakan", "1kuvD2AZ_DOxKp95hCl0j1z3HDlmlajTjcKP7caMRa0Y"),
  source("2026-tarakan-agu", "2026", "Tarakan", "Agustus 2026 · Pool Tarakan", "1sm3Fa7LQOQentpRjdXFOG8OiUPByfGjO3irLcSI0Lwg"),
  source("2026-tarakan-sep", "2026", "Tarakan", "September 2026 · Pool Tarakan", "1EGC2SkBiR59TooVGqIoRWJOLiLCiiieTVmOw3z3IV8s"),
];

function clean(value: string | undefined) { return (value ?? "").replace(/\u00a0/g, " ").trim(); }
export function normalizePoolName(value: string): string { return value.trim().replace(/^pool\s+/i, "").replace(/\s+/g, " ").trim(); }
function parseCsv(input: string): string[][] {
  const rows: string[][] = []; let row: string[] = []; let cell = ""; let quoted = false;
  for (let i = 0; i < input.length; i += 1) { const char = input[i]; const next = input[i + 1]; if (char === '"') { if (quoted && next === '"') { cell += '"'; i += 1; } else quoted = !quoted; } else if (char === "," && !quoted) { row.push(cell); cell = ""; } else if ((char === "\n" || char === "\r") && !quoted) { if (char === "\r" && next === "\n") i += 1; row.push(cell); if (row.some((v) => v.trim())) rows.push(row); row = []; cell = ""; } else cell += char; }
  if (cell || row.length) { row.push(cell); if (row.some((v) => v.trim())) rows.push(row); } return rows;
}
function number(value: string | undefined) { const result = Number(clean(value).replace(/[^0-9.-]/g, "")); return Number.isFinite(result) ? result : 0; }
function days(value: string) { const match = value.match(/\d+/); return match ? Number(match[0]) : 0; }

const MONTH_ID: Record<string, number> = { jan: 0, feb: 1, mar: 2, apr: 3, mei: 4, jun: 5, jul: 6, agu: 7, sep: 8, okt: 9, nov: 10, des: 11, may: 4, aug: 7, oct: 9, dec: 11, januari: 0, februari: 1, maret: 2, april: 3, juni: 5, juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11, january: 0, february: 1, march: 2, june: 5, july: 6, august: 7, october: 9, december: 11 };
const MONTH_FULL_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function parseIdDate(value: string): Date | null {
  const s = clean(value); if (!s) return null;
  let m = s.match(/^(\d{1,2})[\s-]+([A-Za-z]+)[\s-]+(\d{4})$/);
  if (m) {
    const day = Number(m[1]); const month = MONTH_ID[m[2].toLowerCase().slice(0, 3)]; const year = Number(m[3]);
    if (month === undefined || !day) return null;
    return new Date(year, month, day);
  }
  // fallback: DD/MM/YYYY or DD-MM-YYYY (numeric, assume day-first for Indonesian sheets)
  m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    const day = Number(m[1]); const month = Number(m[2]) - 1; const year = Number(m[3]);
    if (day < 1 || day > 31 || month < 0 || month > 11) return null;
    return new Date(year, month, day);
  }
  return null;
}
export function formatIdDate(date: Date): string { return `${date.getDate()} ${MONTH_FULL_EN[date.getMonth()]} ${date.getFullYear()}`; }
function monthKey(date: Date): number { return date.getFullYear() * 100 + (date.getMonth() + 1); }
function weekInMonth(date: Date): number {
  const day = date.getDate();
  if (day <= 3) return 1;
  if (day <= 10) return 2;
  if (day <= 17) return 3;
  if (day <= 24) return 4;
  return 5;
}

function parseDailyPool(rows: string[][], sourceInfo: LkpbSource): PoolSummary | null {
  const header = rows.findIndex((row) => clean(row[1]).toLowerCase() === "pool name" && clean(row[3]).toLowerCase() === "tanggal");
  if (header < 0) return null;
  const data = rows.slice(header + 1).filter((row) => /^\d+$/.test(clean(row[0])));
  if (!data.length) return null;
  const lkpb = data.reduce((sum, row) => sum + number(row[17]), 0);
  const open = data.reduce((sum, row) => sum + number(row[14]) + number(row[17]), 0);
  const target = data.reduce((sum, row) => sum + number(row[19]), 0);
  const real = data.reduce((sum, row) => sum + number(row[20]), 0);
  return { year: sourceInfo.year, pool: sourceInfo.pool, sourceKey: sourceInfo.sourceKey, label: sourceInfo.label, days: data.length, lkpb, open, target, real, achievement: target ? Math.round((real / target) * 1000) / 10 : 0 };
}

function parseDetail(rows: string[][], sourceInfo: LkpbSource): { records: LkpbRecord[] } {
  const headerIndex = rows.findIndex((row) => clean(row[1]).toUpperCase().includes("NO DO"));
  if (headerIndex < 0) return { records: [] };
  const header = rows[headerIndex].map((cell) => clean(cell).toUpperCase());
  const statusCol = header.findIndex((cell) => cell === "STATUS");
  const statusIdx = statusCol >= 0 ? statusCol : 6;
  const catIdx = header.findIndex((cell, i) => cell === "KATEGORI LKPB" && i > statusIdx);
  const catIdxFinal = catIdx >= 0 ? catIdx : 7;
  const reasonIdx = Math.max(statusIdx, catIdxFinal) + 1;
  const records = (headerIndex >= 0 ? rows.slice(headerIndex + 1) : []).filter((row) => !clean(row[1]).toUpperCase().startsWith("TOTAL") && clean(row[1]) && ["OPEN", "FINISH"].includes(clean(row[statusIdx]).toUpperCase())).map((row, index) => {
    const jalurAwalDate = parseIdDate(row[3]);
    const reinstallDate = parseIdDate(row[4]);
    const slaFromSheet = days(clean(row[5]));
    const slaDays = jalurAwalDate ? Math.max(0, Math.floor((Date.now() - jalurAwalDate.getTime()) / (24 * 60 * 60 * 1000))) : slaFromSheet;
    return {
      no: /^\d+$/.test(clean(row[0])) ? number(row[0]) : index + 1,
      noDo: clean(row[1]),
      customer: clean(row[2]),
      jalurAwal: jalurAwalDate ? formatIdDate(jalurAwalDate) : clean(row[3]),
      jalurAwalDate: jalurAwalDate ? `${jalurAwalDate.getFullYear()}-${String(jalurAwalDate.getMonth() + 1).padStart(2, "0")}-${String(jalurAwalDate.getDate()).padStart(2, "0")}` : null,
      reinstall: reinstallDate ? formatIdDate(reinstallDate) : clean(row[4]),
      sla: jalurAwalDate ? `${slaDays} Day` : clean(row[5]),
      slaDays,
      status: clean(row[statusIdx]).toUpperCase(),
      category: clean(row[catIdxFinal]).toUpperCase(),
      reason: clean(row[reasonIdx]),
      year: sourceInfo.year,
      pool: sourceInfo.pool,
      week: jalurAwalDate ? weekInMonth(jalurAwalDate) : 0,
      month: jalurAwalDate ? monthKey(jalurAwalDate) : 0,
    };
  });
  return { records };
}

export function parseLkpbCsv(csv: string, sourceInfo: LkpbSource) { const rows = parseCsv(csv); const poolSummary = parseDailyPool(rows, sourceInfo); if (poolSummary) return { records: [] as LkpbRecord[], poolSummary }; const detail = parseDetail(rows, sourceInfo); if (!detail.records.length) throw new Error(`No Detail LKPB records found for ${sourceInfo.label}`); return { ...detail, poolSummary: null }; }
export function __parseLkpbCsvForTests(csv: string) { return parseLkpbCsv(csv, DEFAULT_LKPB_SOURCES[0]); }

function buildDashboard(records: LkpbRecord[], poolSummaries: PoolSummary[], sources: Array<LkpbSource & { enabled: number }>, isFallback = false): LkpbDashboard {
  const total = records.length; const open = records.filter((item) => item.status === "OPEN").length; const finish = records.filter((item) => item.status === "FINISH").length; const categoryMap = new Map<string, number>(); records.forEach((item) => categoryMap.set(item.category, (categoryMap.get(item.category) ?? 0) + 1));
  const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count, percentage: total ? Math.round((count / total) * 1000) / 10 : 0 })).sort((a, b) => b.count - a.count);
  const defs = [{ name: "< 15 hari", test: (v: number) => v < 15, tone: "good" as const }, { name: "15–29 hari", test: (v: number) => v >= 15 && v < 30, tone: "watch" as const }, { name: "≥ 30 hari", test: (v: number) => v >= 30, tone: "risk" as const }];
  const slaBuckets = defs.map(({ name, test, tone }) => { const count = records.filter((item) => test(item.slaDays)).length; return { name, count, percentage: total ? Math.round((count / total) * 1000) / 10 : 0, tone }; });
  const years = Array.from(new Set(sources.map((item) => item.year))).sort().reverse(); const pools = Array.from(new Set([...records.map((item) => item.pool), ...poolSummaries.map((item) => item.pool)])).sort();
  const months = Array.from(new Set(records.map((item) => item.month).filter((m) => m > 0))).sort();
  const poolMap = new Map<string, LkpbRecord[]>();
  records.forEach((item) => { const arr = poolMap.get(item.pool) ?? []; arr.push(item); poolMap.set(item.pool, arr); });
  const poolIssues: PoolIssue[] = Array.from(poolMap.entries()).map(([pool, items]) => {
    const t = items.length; const o = items.filter((i) => i.status === "OPEN").length; const f = items.filter((i) => i.status === "FINISH").length;
    const overdue = items.filter((i) => i.status === "OPEN" && i.slaDays >= 30).length;
    const avgSlaDays = t ? Math.round((items.reduce((s, i) => s + i.slaDays, 0) / t) * 10) / 10 : 0;
    const catMap = new Map<string, number>(); items.forEach((i) => catMap.set(i.category, (catMap.get(i.category) ?? 0) + 1));
    const topCategory = Array.from(catMap.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
    return { pool, year: items[0]?.year ?? "", total: t, open: o, finish: f, avgSlaDays, overdue, topCategory };
  }).sort((a, b) => b.open - a.open);
  return { records, poolSummaries, poolIssues, months, sources, years, pools, summary: { total, open, finish, completionRate: total ? Math.round((finish / total) * 100) : 0, avgSlaDays: total ? Math.round((records.reduce((sum, item) => sum + item.slaDays, 0) / total) * 10) / 10 : 0, overdue: records.filter((item) => item.status === "OPEN" && item.slaDays >= 30).length }, categories, slaBuckets, sourceUrl: LKPB_SOURCE_URL, lastSyncedAt: new Date().toISOString(), isFallback };
}

export async function getLkpbDashboard() {
  const { ensureLkpbSources } = await import("./db"); const configured = await ensureLkpbSources(); const sources = configured as Array<LkpbSource & { enabled: number }>; const enabledSources = sources.filter((item) => item.enabled === 1); const results = await Promise.allSettled(enabledSources.map(async (item) => { const url = `${CSV_BASE}/${item.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(item.sheetName)}`; const response = await fetch(url, { signal: AbortSignal.timeout(8000), headers: { Accept: "text/csv" } }); if (!response.ok) throw new Error(`${response.status}`); return { item, parsed: parseLkpbCsv(await response.text(), item) }; }));
  const records: LkpbRecord[] = []; const poolSummaries: PoolSummary[] = []; results.forEach((result) => { if (result.status === "fulfilled") { records.push(...result.value.parsed.records); if (result.value.parsed.poolSummary) poolSummaries.push(result.value.parsed.poolSummary); } });
  // dedup: key = (normalizedNoDo, normalizedPool, month). later sources win; first record at that key is kept.
  const seen = new Map<string, LkpbRecord>();
  for (const record of records) { const key = `${normalizePoolName(record.pool).toLowerCase()}|${record.noDo.trim().toLowerCase()}|${record.month}`; if (!seen.has(key)) seen.set(key, record); }
  const deduped = Array.from(seen.values());
  if (!deduped.length && !poolSummaries.length) { const fallback = DEFAULT_LKPB_SOURCES[0]; const fallbackRows = await fetch(`${CSV_BASE}/${fallback.spreadsheetId}/gviz/tq?tqx=out:csv&sheet=Detail%20LKPB`).then((response) => response.text()).catch(() => ""); try { const parsed = parseLkpbCsv(fallbackRows, fallback); return buildDashboard(parsed.records, [], sources, false); } catch { return buildDashboard([], [], sources, true); } }
  return buildDashboard(deduped, poolSummaries, sources, false);
}