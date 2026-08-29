# CCAR-F 考試心得文 — Pipeline 追蹤（ISS-227 × ISS-108 × ISS-082）

> 本檔是這篇文章從選題到上架的全程記錄，三個用途：
> 1. **ISS-227**：文章本體的進度追蹤
> 2. **ISS-108（Round 4 校準）**：改稿版次計數、A/B 簇新增筆數、第八層 Q–Y 命中/誤殺的原始記錄（歸因細節見 `round4-feedback-log.md`）
> 3. **ISS-082（/blog-publish skill）**：發布階段照 `efforts/areas/personal-brand/blog-publish-sop.md` 走，過程實錄供 skill 建置比對

## 卡片對照

| 卡 | 角色 | 驗收 |
|---|---|---|
| ISS-227 | 文章本體 | 發布上站＋子項（中英證照文加 882 更新＋內鏈） |
| ISS-108 | Round 4 校準（本篇 = 觸發條件 1「真實寫作」） | 改稿 ≤5 版＋忠實度/overclaim 兩簇零新增＋標記零沉沒＋第八層 Q–Y 逐 pattern 判 → flux-rubric 升 v0.3.0 → creative-team-v4 搬 production＋移除 CLAUDE.md 校準段（= project close） |
| ISS-082 | /blog-publish skill 建置 | 文章內容定稿後、發布階段建 skill 並以本篇試跑 |

## 階段記錄

| 時間（2026-08-29） | 階段 | 結果 |
|---|---|---|
| 上午（對話） | 決策：五問決策單（SO NICE 收斂法） | 讀者排序／主角／讀者第一步／thesis／不寫清單全數拍板；標題定案「2026 Anthropic 架構師證照 CCAR-F 考試心得：備考方法與考點解析」；voice = flux 口語（分享文）；**不揭露二戰**為最高紅線 |
| ~10:40 | archivist PRQ | coverage 0.80 → SKIP researcher；相鄰文章領土清單＋6 條 warnings（NDA／29 條措辭／禁語）；lint suggested（歸檔後跑 [歸檔 lint]） |
| ~11:05 | writer 骨架 v1 | 七節結構＋開場試寫；writer 抓到三條數據軌來源需分流（CCG vs 自建站 vs 冷測） |
| 11:24 | 使用者 feedback 輪 1（5 條）→ 骨架 v1.1 | 示意題來源、物流細節、考場清單、開場 AI 味、fix-your-tools 內鏈移除；查證 mock-r4 = 自製全真模考 60 題 |
| ~11:45 | 使用者 feedback 輪 2（2 條）→ 骨架 v1.2 | CCG 錯題「改寫後可用」定案；刪「就可以放下了」姿態句（刪句不換句） |
| ~11:55 | writer 全文 v1（進行中） | 骨架 v1.2 凍結為結構依據；開場三段一字不改 |
| ~12:10 | writer 全文 v1 交稿 → **v1 凍結** | 約 3,550 字，自評 OVERALL 0.85（WEAKEST: Mental Model 0.55，刻意不造比喻誠實評低）。2 筆 [VERIFY WITH USER]＋2 筆 external_facts_to_verify。⚠️ 主 Claude 發現：文中「30 條 objective／25 條 100%」與成績單 PDF（29／24）不符——writer 用了 context 舊記憶未真正重讀已修正的里程碑檔；留給 editor 流程驗證，修正進 v2。**流程發現：resumed agent 不一定重讀檔案，重要事實要在訊息裡直接給** |
| ~12:15 | editor 七步驗證（進行中） | 含第八層 Q–Y 逐 pattern 回報（Round 4 驗收數據）＋本篇 6 條紅線檢查 |
| ~12:25 | fact-checker 完成（OVERALL 0.92，13 筆：8 ✅／4 ⚠️／1 ❌） | **主發現：Pearson VUE 有 Anthropic 專屬 OnVUE 規則頁**——v1「查不到完整文件」一句不成立，該段可升級為具體規則＋Tier 1 來源（30 分 check-in／360 度房間掃描／clean desk／單螢幕／禁 VPN 耳機／監考僅英文／in-exam chat），且全部規則口吻、零揭露風險，SEO 價值高。恆逸=精誠旗下 PVTC ✅（需加「授權按 program 開通」但書）；證件簽名要求屬 Pearson 某版全球政策需留退路；12 官方樣題在 Exam Guide 內 ✅（另有 5 組 Preparation Exercises 可補）；自製模考 60 題／120 分與官方規格一致（可加一句佐證）；CTA 連結全數可達。建議措辭修正 7 處已列於 fact-check 報告 |

| ~12:40 | editor 完成 — **REWORK**（hard gate：System Fidelity 0.40） | 唯一必改＝29/24 兩數字（修正後預估 0.85 PASS）。10 維度通過、紅線 5/6 過、8 層 pattern 零實質命中。Q–Y 驗收：Q/V/U/X 建議轉正、R regex 待修、Pattern O 誤殺 1 筆。另回報 2 個 rubric 缺口（Evidence 不查正確性、ARTIFACTS 計數目測）。詳 round4-feedback-log.md |
| ~13:00 | 使用者 3 項拍板 | ① 官方樣題照登＋標明「Exam Guide 樣題」（未採主 Claude 換題建議）② 示意題第二題改抓 CCG 錯題紀錄（抽考點重寫，紅線不變）③ cohort-web 排除結案 |
| ~13:05 | writer v2（進行中） | 修訂包：29/24 數字＋editor 4 項＋fact-check 7 項升級＋示意題第二題換源（ccg-drill-log 有作答紀錄的錯題重寫版）。ARTIFACTS 計數改 grep 實測 |
| ~13:25 | writer v2 交稿 | 全項完成＋自抓 2 筆：v1 漏掉的「你」字違規（grep 實測現形）、Preparation Exercises 4 vs 5 落差。示意題第二題＝CCG R1 Q38（q-1-7-004，session-state-resumption，兩輪都答錯有紀錄）全新改寫。段落 40→64（第一輪自評密度 0.008 未達門檻，主動加拆段）。**校準訊號：grep 實測計數制度化後，writer 自抓錯誤的能力明顯提升** |
| ~13:30 | 仲裁：Preparation Exercises = 4 組 | vault 精簡檔＋writer 逐頁數一致；fact-checker「5 組」誤數。**流程發現：兩個 agent 對同一 PDF 給出不同計數，第三源仲裁必要** |
| ~13:30 | editor 複驗 v2（進行中，返工 2/2） | delta 複驗＋示意題改寫距離逐句比對（CCG 著作權紅線） |
| ~13:50 | **editor 複驗 PASS（0.85）** | hard gate 全解除；示意題第二題改寫距離判定可接受（C/D 選項最近，可選擇性保守化）；Rhythm 降 0.70（單句段 64%，C 簇訊號）；「120 分鐘」flag 由主 Claude 以 fact-check Tier 1 來源結案。發布前 blocker 三筆：刪修訂註記／frontmatter＋H1（blog-metadata 階段）／（120 分鐘已結案） |
| 待使用者 | **階段 5.5 逐段改稿（v2 起）** | 使用者審 v2；重點看示意題第二題 C/D 選項改寫距離。NDA 樣題照登＝使用者 8/29 已終局拍板。版次額度：剩 4 版 |

| 下午（連續多輪） | **階段 5.5 使用者逐段改稿完成（v3 系列）** | 全文每節過使用者的手，feedback 歸因 U1–U28+ 見 round4-feedback-log.md。重大決策：thesis 改「值得考」、方法節重排五塊、建議節換血（門檻＋兩條）、收尾個人化＋CPN 意向表單 CTA（ISS-237，FORM_URL_PLACEHOLDER＝publish blocker）。最重發現：U27 否認句捏造（紅線雙向掃修正） |

| 下午後段 | **v3 定版 → v4 SEO/讀者價值優化輪** | 三路情報合成：seo skill 查量（zh：ccaf 46/claude 架構師 92；US：exam 詞 1,632/KD13、architect certification 9,027/KD3）＋researcher SERP 掃描（繁中第一手心得零篇＝先發確認；EN How-I-Passed 飽和；CCAF 裸詞撞名美空軍；競品配分數字有錯版）＋母文分工提案（hub-spoke：制度歸母文、執行歸新文，雙向內鏈）。v4 落地：CCA-F/CCAF 別名＋中文名「Claude 認證架構師」入文、H2 改造 ×4、FAQ 節 6 題、路線圖 bug 修、Prep Exercises 改中性（使用者未答 A/B 取安全預設）。EN 版開卡 ISS-238（第二棒，目的拉 DR；母文 EN 主詞現排 #15 待推首頁）。表單建置派 agent（ISS-237，照 form→CF KV pattern，部署前查 whoami） |

| 晚間 | editor 終掃 PASS 0.86 → blog-metadata gates 拍板（life-learning／desc A／featured:true／keyphrase CCAR-F 考試心得）→ publish 檔組裝 → citability-audit **14 PASS/1 FAIL/1 WARN（66 分過門檻）** | FAIL＝結構化內容 0 清單 0 表格 → **刻意接受**（敘事流優先，audit 認可）；S2 母文改相對路徑 ✅、S3 補 claude-code-tutorial 內鏈 ✅。憑證圖二張入文（去識別化分數帶＋Credly badge）。hero A/B 生成中 |

### 🚚 部署資產清單（push 前逐項核，缺一上站即 404）

| 來源（drafts/ccar-f-exam-article/） | 目的地（personal-website/public/images/blog/） | 注意 |
|---|---|---|
| ccarf-prep-flowchart.png | ccar-f-exam-experience-flowchart.png | **要改名** |
| score-report-strip.png | ccar-f-exam-experience-score.png | **要改名** |
| ccaf-badge.png | ccar-f-exam-experience-badge.png | **要改名** |
| （hero 選定後） | ccar-f-exam-experience.webp | cwebp -q 85 轉檔 |
| publish-ccar-f-exam-experience.md | src/content/blog/zh-TW/ccar-f-exam-experience.md | 改名去 publish- 前綴 |

| 22:4x | **🚀 zh 版發布上線**（commit 80f57c0 → CF Pages） | live 200／og 200／母文更新上線。ISS-227 done、ISS-082 done（/blog-publish 首次試跑全程走完）。EN 版（ISS-238）writer 進行中 |
| 23:1x | **🚀 EN 版發布上線**（commit c6a8ac2） | writer 改寫非逐字翻（考場段→PV 官網查詢／證件段→護照拼音通用原則／閱讀速度→非母語視角）；主 Claude QA：紅線雙向掃乾淨、破折號 0、meta description 340→161 字元。EN 母文同 deploy 加 882 更新＋內鏈。live 200。ISS-238 done |
| 23:2x | **母文導流補強**（commit 71308ba，中英同步） | 使用者拍板 B 案：eligibility 段 → 心得文文末協助管道（不直連表單）；收尾 CTA zh mailto→表單、EN 加表單行；relatedPosts 加心得文（去 ai-harness）。ISS-227 子項全收 |

## 待走階段（照 creative-team [創作] SOP＋blog-publish-sop）

> ✅ blocker 解除：意向表單上線 https://ccarf-contact.pages.dev/（ISS-237 done），URL 已填入 v4。剩餘 blocker＝發布層三件（刪修訂註記／frontmatter＋H1／OnVUE 頁與考場清單與 CCG 免費現況 re-check）

- [ ] writer 全文 v1 → **v1 凍結**（校準 ground truth，改稿版次從此起算）
- [ ] editor 7 步驗證（含 Step 0 taiwan-mandarin 8 層、Step 2.5 System Fidelity）→ Editor Report、【待使用者確認】逐筆轉達
- [ ] fact-checker：external_facts_to_verify（精誠／恆逸考場、線上監考規則、第三方題庫現況）
- [ ] 階段 5.5 使用者逐段改稿（**vN 計數，≤5 版 = Round 4 達標線**；每筆 feedback 歸因 `round4-feedback-log.md`）
- [ ] 定稿 → blog-metadata（taxonomy＋SEO metadata＋keyphrase 拍板）
- [ ] citability-audit（17 項）
- [ ] [產圖] hero（拍板點：hero 選圖）
- [ ] **ISS-082 啟動**：/skill-creator 建 /blog-publish skill 骨架 → 以本篇走 Phase 2–9 試跑
- [ ] 上站（zh-TW）＋使用者最終確認後 push
- [ ] ISS-227 子項：中英證照文加 882 更新段＋內鏈本文
- [ ] archivist 5-Stage Ingest（含 content-ip-map 加行；順帶 [歸檔 lint]——PRQ watchdog 已提示 56 天未 lint）
- [ ] **Round 4 判定**：版次數＋A/B 簇統計＋第八層 Q–Y 逐 pattern（含候撿：姿態句家族 S1/S8）→ 達標升 v0.3.0＋close 三連；未達標開 Round 5
