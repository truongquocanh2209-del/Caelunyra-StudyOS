# Caelunyra StudyOS v1.20.0 — Final Stability Audit & Data Safety

Không gian học tập cá nhân gồm kế hoạch, ghi chú, tài liệu, thư viện quiz đã lưu, Exam Mode, flashcard đã lưu, ôn tập ngắt quãng, thống kê và lịch sử xóa.

## Đưa lên GitHub Pages

1. Giải nén gói ZIP trên máy tính.
2. Tải **các tệp bên trong thư mục này** lên thư mục gốc mà GitHub Pages đang publish; không tải nguyên ZIP thành trang web.
3. Giữ các tệp cạnh `index.html`; không đổi tên `app.js`, `styles.css`, `manifest.webmanifest` hoặc các SVG.
4. Trong **Settings → Pages**, chọn đúng branch và thư mục root của repository. Sau khi publish, mở website và kiểm tra đăng nhập, các trang chính, Exam Mode, Storage và màn hình điện thoại.

## Tệp cần có

- `index.html` — trang ứng dụng.
- `app.js` — logic ứng dụng và lưu dữ liệu cục bộ.
- `styles.css` — giao diện responsive và trạng thái UI.
- `manifest.webmanifest`, `favicon.svg`, `caelunyra-mark.svg`, `caelunyra-primary-dark.svg`, `caelunyra-primary-light.svg`, `caelunyra-compact.svg` — metadata và bộ nhận diện SVG.
- `sw.js` — cache app shell cho lần mở lại offline sau lần tải đầu thành công.
- `.nojekyll` — tránh GitHub Pages bỏ qua một số tệp.
- `README.md` và `LICENSE` — hướng dẫn và giấy phép.
- `QA-REPORT.md`, `FINAL-AUDIT-REPORT.md` và `DEVELOPMENT-LOG.md` — hồ sơ kiểm thử, kiểm toán cuối và lịch sử quyết định kỹ thuật.

## Quiz, Flashcards và dữ liệu cũ

Các giao diện tạo Quiz và Flashcard mới đã được gỡ theo phạm vi phát hành. Bộ quiz, flashcard và lịch ôn đã được lưu trước đây không bị tự động xóa; vẫn có thể mở để luyện tập, tiếp tục ôn hoặc sử dụng làm nguồn cho Exam Mode. Quiz mẫu vẫn có thể được làm. Question Bank vẫn hỗ trợ thêm câu hỏi phục vụ bài thi.

## Strict Screen và Exam Mode

Strict Screen yêu cầu trình duyệt cấp quyền cho Fullscreen API. Chỉ sau khi fullscreen đã thực sự được thiết lập và phiên thi đang hoạt động, việc rời fullscreen hoặc chuyển tab/ẩn trang mới được ghi nhận là vi phạm theo các tín hiệu website có thể quan sát. Khi vi phạm đã được xác nhận, phiên hiện tại bị hủy; câu trả lời và snapshot câu hỏi của lượt bị hủy được loại khỏi bản ghi, không tạo kết quả hoàn thành hoặc cộng XP. Các bài thi hoàn thành trước đó không bị xóa.

Mức khóa vào lại tăng theo số lần vi phạm của cùng cấu hình bài thi: lần 1 là 5 giây, lần 2 là 15 giây, lần 3 là 30 giây, từ lần 4 trở đi đến deadline của lượt vi phạm. Bộ đếm và thời hạn khóa được lưu trong `localStorage`, vì vậy refresh không đặt lại chúng trong hồ sơ trình duyệt thông thường. **Giới hạn quan trọng:** đây là website tĩnh không có backend; dữ liệu local có thể bị người dùng có kiến thức kỹ thuật sửa hoặc xóa, nên không thể coi là cơ chế chống gian lận có tính bảo đảm máy chủ. Website không khóa hệ điều hành, không thể chặn mọi cách đóng trình duyệt và không thể giám sát thiết bị khác.

## Delete Mode

Các thao tác chọn/xóa trong những module có quản lý dữ liệu được ẩn theo mặc định. Bật **Bật chế độ xóa** ngay trong module tương ứng để hiển thị công cụ xóa; tắt chế độ sẽ bỏ lựa chọn tạm thời mà không xóa dữ liệu. Trong Calendar, checkbox hoàn thành chỉ hiển thị khi Delete Mode tắt; khi bật chế độ xóa, nó được ẩn và chỉ còn checkbox chọn mục cần xóa. Trung tâm thông báo cũng có chế độ xóa riêng.

## Profile và danh sách flashcard

Profile hỗ trợ tải JPEG/PNG/WebP tối đa 5 MB, xử lý và thu nhỏ ảnh về dữ liệu raster, xem trước trước khi áp dụng, hủy xem trước hoặc quay lại avatar biểu tượng. Ảnh được lưu cục bộ, không đồng bộ cloud. Trong Flashcards, nút chevron ở tiêu đề “Thẻ trong bộ đang xem” thu gọn/mở rộng danh sách mà không sửa dữ liệu thẻ; trạng thái mở/đóng được lưu riêng theo bộ trong cài đặt cục bộ.

## Storage Word

Khu vực **Tài liệu** là trình soạn thảo rich-text hiện có, gồm định dạng, danh sách, tiêu đề, chèn ảnh/bảng/liên kết, lưu cục bộ, mở lại và xuất theo các định dạng được ứng dụng hỗ trợ. Khi chuyển khỏi trình soạn thảo, ứng dụng sẽ cố lưu tài liệu và báo nếu không thể ghi dữ liệu.

## Hỗ trợ mở lại khi offline

Trên HTTPS (bao gồm GitHub Pages), service worker cache các tệp ứng dụng cùng origin sau lần tải đầu thành công. Khi mất mạng, website có thể mở lại giao diện đã cache; dữ liệu học tập vẫn lưu bằng localStorage. Lần mở đầu tiên trên thiết bị mới vẫn cần mạng, việc xóa dữ liệu trang sẽ xóa cả cache, và đường dẫn học liệu bên ngoài vẫn cần Internet. Khi cập nhật phiên bản mới, tải trang lúc có mạng để nhận app shell mới. Trình duyệt hoặc chế độ `file://` không hỗ trợ service worker sẽ tiếp tục chạy ứng dụng với cơ chế cache thông thường.

## Lưu dữ liệu và giới hạn tài khoản

Đây là website tĩnh. Tài khoản và dữ liệu học tập được lưu trong bộ nhớ trình duyệt trên thiết bị hiện tại; gói này không có backend xác thực hoặc đồng bộ đám mây. Đăng nhập cục bộ giúp phân tách hồ sơ trong cùng trình duyệt nhưng không thay thế xác thực máy chủ. Hãy xuất bản sao lưu JSON trong Cài đặt trước khi dọn dữ liệu trình duyệt hoặc thay đổi triển khai.

## QA

Chạy kiểm tra logic gọn bằng Node.js 20+: `node --check app.js`, `node --check sw.js`, `node --test tests/logic-smoke.test.cjs tests/sw-smoke.test.cjs`. Gói phát hành đi kèm `QA-REPORT.md` ghi rõ kiểm tra cú pháp, logic cô lập, phân tích CSS/HTML và giới hạn kiểm thử giao diện. Không coi những mục bị chặn do môi trường không hỗ trợ là đã PASS.

## Cải tiến v1.14.6 — bảo vệ bản nháp và nhiều tab

- Khi chỉnh sửa Storage Word, chuyển trang, chọn tab tài liệu khác, đóng tab hoặc đăng xuất sẽ bị chặn nếu bản nháp chưa thể ghi vào bộ nhớ trình duyệt. Nút **Cứu bản nháp TXT** xuất toàn bộ văn bản đang hiển thị, độc lập với localStorage; TXT **không giữ định dạng rich-text**.
- Nếu mã HTML của tài liệu vượt 120.000 ký tự, ứng dụng không cắt lặng lẽ phần cuối rồi báo thành công. Hãy xuất bản nháp và chia thành tài liệu nhỏ hơn để tiếp tục.
- Nếu tài khoản được mở trong nhiều tab, phiên cũ không tự ghi đè một bản dữ liệu mà tab khác đã sửa: ứng dụng sẽ cảnh báo và từ chối lưu cho đến khi người dùng giải quyết xung đột. **Không có đồng bộ/merge tự động**; hãy xuất bản sao lưu ở tab cần giữ dữ liệu, kiểm tra và mở lại tab để tải bản mới nhất. Bảo vệ này là so sánh trước khi ghi, **không phải khóa giao dịch nguyên tử** giữa các tab.
- Khi không thể lưu hoặc có xung đột, tuyệt đối không xóa dữ liệu trình duyệt trước khi xuất những tài liệu cần cứu.

Bản nguồn có thêm `tests/data-integrity.test.cjs`. Kiểm thử bằng `node --check app.js && node --check sw.js && node --test tests/*.test.cjs`. Kiểm thử này chưa thay thế nghiệm thu bằng trình duyệt/thiết bị thực.


## Bản 1.17.0 — COSMIC / APEX

- Cảnh báo vi phạm Strict Screen dùng modal ở giữa viewport, còn bảng khóa trong Exam Mode giữ thông tin và thời gian đếm ngược. Bấm “Đã hiểu” hoặc Escape chỉ đóng bảng thông tin, không bỏ khóa.
- Khắc phục thiếu CSS cho bảng khóa v1.14.6: flex/grid co giãn, văn bản tự xuống dòng và giới hạn modal theo chiều cao viewport.
- Bộ nhận diện mới Caelunyra: logo hình học SVG, favicon, metadata, manifest; các khóa lưu trữ cũ tiếp tục giữ nguyên để không mất dữ liệu. Trình nhập JSON nhận bản sao lưu tên cũ.
- Cập nhật phiên bản cache và tài nguyên nội bộ khi triển khai. Không xóa bộ nhớ trình duyệt để cập nhật vì dữ liệu người dùng được lưu tại đó.
- Kiểm thử responsive tự động trên các fixture HTML/CSS dùng Chromium được ghi lại trong `QA-REPORT.md`; kiểm tra tương tác toàn ứng dụng qua URL bị môi trường thử nghiệm chặn, vẫn cần nghiệm thu trên website thật.

## Hồ sơ bổ sung

`BRAND-GUIDE.md` ghi quy trình đặt tên và cách dùng logo. `COPYRIGHT-AUDIT.md` ghi kiểm kê tài nguyên/bản quyền với giới hạn xác minh. `qa-evidence/` chứa kết quả test và ảnh màn hình fixture, không phải bản sao dữ liệu người dùng.

## Bản 1.17.0 — Signal Bubbles & Healthy Study Rhythm

**Có gì mới:**

- **Signal Bubbles:** lời nhắc được hiển thị trong bong bóng nổi có biểu tượng, tiêu đề, lời nhắc, thao tác nhanh và nút đóng; lỗi lưu quan trọng vẫn xuất hiện ngay cả khi tắt bong bóng. Giới hạn tối đa ba toast đồng thời và gộp thông báo trùng trong hàng đợi.
- **Wellness Nudge:** thông báo gợi ý nghỉ khi một phiên tập trung liên tục đạt mốc bạn chọn (30 / 50 / 75 / 90 phút); lời nhắc tiếp theo theo phiên dài được giới hạn và chỉ áp dụng khi phiên đang chạy, không nhắc khi phiên đã tạm dừng hoặc đang nghỉ. Sau khi dữ liệu thực được lưu, có nhắc tổng thời lượng nếu đã học từ 180 phút trong ngày nhưng ghi nhận chưa đến 10 phút nghỉ trong Focus Room. Đây là lời nhắc quản lý nhịp học, không phải đánh giá sức khỏe y tế.
- **Nhắc sau 20 phút:** nút tạm hoãn ngay trên bong bóng wellness; lưu mốc tạm hoãn cục bộ và nhắc lại nếu sau mốc đó điều kiện vẫn còn phù hợp. Tắt loại thông báo wellness hoặc giờ yên tĩnh sẽ ngừng tạo nhắc mới.
- **Study Rhythm:** bảng tổng hợp thời lượng tập trung thực đã lưu, số phút nghỉ trong Focus Room, công việc hôm nay, số thẻ đến hạn, đề xuất tiếp theo và tiến độ mục tiêu học theo ngày. Hiển thị ở Dashboard và trung tâm thông báo.
- **Nghỉ một chạm:** bắt đầu giờ nghỉ 5 hoặc 10 phút trong Focus Room. Khi đang làm bài thi hoặc có bản nháp tài liệu chưa lưu, luồng mở giờ nghỉ được chặn an toàn.
- **Mục tiêu học tự chọn:** đặt mục tiêu từ 30 đến 240 phút/ngày, theo số phút học được lưu; không cộng phút nghỉ; thông báo khi đạt mục tiêu được ghi một lần mỗi ngày và có thể tắt trong phần thông báo thành tựu.

**Cấu hình:** Mở **Cài đặt → Thông báo cá nhân hóa → Mở rộng**, sau đó bật/tắt bong bóng, loại thông báo "Bảo vệ nhịp học", chọn mốc nhắc nghỉ và mục tiêu học mỗi ngày. Trạng thái mới được lưu trong cùng dữ liệu cục bộ của tài khoản, tương thích bản 1.16.0.

**Giới hạn quan trọng:** nhắc theo thời gian chỉ được kiểm tra khi trang web đang mở; không có máy chủ push nền khi đã đóng ứng dụng. Quyền Notification của hệ điều hành là tùy chọn, độc lập với bong bóng trong trang. Dữ liệu nghỉ chỉ gồm **các phiên nghỉ đã ghi nhận trong Focus Room**, không thể suy ra tổng thời gian nghỉ thật của một người ngoài ứng dụng.

**Triển khai:** giữ nguyên dữ liệu localStorage (không xóa site data), xuất backup JSON trước khi cập nhật. Phiên bản service-worker cache của bản này là `v1.20.0`; vào trang khi có Internet để trình duyệt tải bản mới trước khi thử mở offline.


## Bản v1.20.0 — Kiểm toán ổn định cuối

- **Storage Word — chống mất dữ liệu:** Không cắt âm thầm nội dung HTML lớn hơn 120.000 ký tự trong khi mở dữ liệu cũ. Giới hạn *lưu* 120.000 ký tự HTML vẫn được giữ và sẽ cảnh báo nếu vượt. Khi lưu không thành công, nút xuất TXT/HTML/Markdown/DOC sẽ xuất từ **nội dung hiện trên trình soạn thảo**, không lấy bản cũ đã lưu, và thông báo rõ bản nháp chưa được lưu vào thư viện. Hãy giữ file xuất trước khi tiếp tục.
- **Focus Room — chống ghi trùng:** Nếu một tab khác tiếp quản phiên Focus, tab cũ không tự cộng phút/XP trùng với tab mới. Focus Room cũng ẩn phần ứng dụng nền khỏi điều hướng bằng bàn phím khi đang mở, và đặt focus vào điều khiển trong phòng.
- **Signal Bubbles:** Gộp thông báo lỗi trùng, ưu tiên lỗi thực sự quan trọng lên trước các bong bóng thông tin, giới hạn hàng đợi; xoá nội dung toast tài khoản cũ khi đăng xuất.
- **Thông báo:** Không để một thời gian lịch sử thông báo bị lỗi khiến trung tâm thông báo sập khi mở.
- **PWA:** Bổ sung hai icon PNG 192×192 và 512×512 tạo từ biểu tượng SVG Caelunyra sẵn có; cập nhật manifest và cache bản v1.20.0, không thêm tài nguyên ngoài hay thư viện mới.
- **QA:** Chạy 36 test Node, 25 ca thao tác browser với dữ liệu cục bộ mô phỏng, 85 ca giao diện chạy mã nguồn HTML/CSS/JS thật trong trang thử `about:blank`, và kiểm tra assets/CSS/manifest. Xem `FINAL-AUDIT-REPORT.md` để hiểu phạm vi và giới hạn kiểm chứng.

### Kiểm thử lại

```bash
node --check app.js
node --check sw.js
node --test tests/*.test.cjs
python tests/final-static-integrity.py
python tests/final-workflow-browser-tests.py
python tests/final-application-browser-audit.py
```

Hai test trình duyệt Python cần Playwright và Chromium hệ thống. Chúng dựng mã thật lên trang `about:blank` và sử dụng **localStorage mô phỏng chỉ phục vụ QA**. Không được coi là đã kiểm thử đăng nhập WebCrypto thực tế, Service Worker HTTPS, thời gian học dài nhiều giờ hoặc thiết bị người dùng. Không chạy trình duyệt với `--disable-web-security` trong sử dụng thông thường — cờ này chỉ dành cho quá trình test cục bộ tách biệt.

**Cách nâng cấp an toàn:** Ở bản đang chạy, xuất JSON sao lưu và kiểm tra tệp tải về. Giữ ZIP v1.17.0 và dữ liệu gốc, triển khai toàn bộ tệp v1.20.0 lên môi trường thử nghiệm trước. Trên website đang hoạt động, **không xoá Local Storage hoặc Site Data**, vì nơi đó chứa cả dữ liệu học tập và tài khoản cục bộ. Mở website có mạng để Service Worker tải phiên bản mới; kiểm tra lại từng module trên thiết bị thực trước khi phát hành rộng.


## Bản v1.20.0 — Trung tâm thông báo cuộn toàn phần

- Chuyển Trung tâm thông báo sang mô hình **cuộn toàn bộ phần thân**, thay vì chỉ cuộn riêng danh sách.
- Ưu tiên hiển thị **danh sách thông báo mới** trước các khối phụ trợ như *Nhịp học hôm nay* và *Trạng thái*.
- Giữ footer thao tác riêng, giúp người dùng luôn đóng nhanh hoặc đánh dấu đã xem mà không che khuất nội dung.
- Bổ sung hồi quy nguồn để xác nhận sự tồn tại của `notification-panel-body` và ràng buộc CSS cuộn.
