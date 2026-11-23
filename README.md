# LUNARA — Bilingual Corporate Website

A responsive multi-page corporate showcase website for a fictional Istanbul-based cleaning products brand.

## Stack
- HTML5
- CSS3
- Vanilla JavaScript
- Arabic (RTL) and Turkish (LTR)
- LocalStorage language preference

## Run locally
Open `index.html` in a browser, or use VS Code Live Server.

## Pages
- `index.html` — Home
- `about.html` — About
- `products.html` — Product catalogue with category filters
- `product-details.html` — Dynamic product details (`?id=...`)
- `contact.html` — Contact form demo

## Important before publishing
1. LUNARA is a placeholder brand name. Check Turkish trademark/domain availability before commercial use.
2. Replace demo product names, images, descriptions, sizes and claims with approved real product information.
3. Replace `info@lunara.com.tr` and the contact details with the company's real details.
4. The contact form is front-end only. Connect it to a backend or form service before launch.
5. Add a real company address, privacy notice, KVKK disclosure and cookie policy as appropriate.
6. Confirm all product claims and usage/safety information against the final product labels.

## Structure
- `css/style.css`
- `js/main.js`
- `js/translations.js`
- `js/products.js`


## تحديثات LUNARA
- تم تغيير اسم العلامة إلى LUNARA في صفحات الموقع واللغتين.
- أضيفت حركات ظهور تدريجية عند التمرير، وتحسينات تفاعلية للأزرار والبطاقات والروابط وحقول النموذج.
- نموذج التواصل مهيأ للإرسال عبر FormSubmit AJAX. قبل التشغيل، افتح `js/main.js` وابحث عن `CONTACT_EMAIL` وتم ضبط البريد المستلم على `luunara1.sy@gmail.com`.
- عند أول إرسال، سترسل FormSubmit رسالة تأكيد إلى ذلك البريد؛ افتحها واضغط رابط التفعيل. بعد التفعيل تصل رسائل الزوار إلى البريد مباشرة.
- شغّل الموقع عبر استضافة/خادم أو Live Server مع اتصال إنترنت.
- لا تضع كلمة مرور البريد الإلكتروني أو بيانات دخول خاصة داخل ملفات الموقع.
