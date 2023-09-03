importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js"),workbox?console.log("Yay! Workbox is loaded \uD83C\uDF89"):console.log("Boo! Workbox didn't load \uD83D\uDE2C"),self.addEventListener("push",function(o){if(console.log("진입함 푸시"),!(self.Notification&&"granted"===self.Notification.permission))return;let n=o.data.json();console.log(n);let i={body:n.content,icon:"./logomain.png",badge:"./logomain.png",data:{url:n.url}};o.waitUntil(self.registration.showNotification(n.title,i))}),self.addEventListener("notificationclick",function(o){o.notification.close();var n=o.notification.data.url;o.waitUntil(clients.matchAll({type:"window"}).then(function(o){for(var i=0;i<o.length;i++){var t=o[i];if(t.url===n&&"focus"in t)return t.focus()}if(clients.openWindow)return clients.openWindow(n)}))}),workbox.precaching.precacheAndRoute([{'revision':'f4ff96609d7ed5dcac9a3c4845bfae5d','url':'/Line 11.svg'},{'revision':'931ae3c95c2789eac7ac631ad7e067fc','url':'/_next/static/RcZXfP49vAFLTF2GRiKe8/_buildManifest.js'},{'revision':'b6652df95db52feb4daf4eca35380933','url':'/_next/static/RcZXfP49vAFLTF2GRiKe8/_ssgManifest.js'},{'revision':'55ed741877043e5a','url':'/_next/static/chunks/29-55ed741877043e5a.js'},{'revision':'adfe0c3886a52159','url':'/_next/static/chunks/414-adfe0c3886a52159.js'},{'revision':'1f9d1b8ad0cfad32','url':'/_next/static/chunks/452-1f9d1b8ad0cfad32.js'},{'revision':'f8c29e940656afc5','url':'/_next/static/chunks/5-f8c29e940656afc5.js'},{'revision':'9716691223f43cfa','url':'/_next/static/chunks/570.9716691223f43cfa.js'},{'revision':'d988558c682bfa90','url':'/_next/static/chunks/589.d988558c682bfa90.js'},{'revision':'205879701a4d2186','url':'/_next/static/chunks/654-205879701a4d2186.js'},{'revision':'7a7e500878b44665','url':'/_next/static/chunks/framework-7a7e500878b44665.js'},{'revision':'75ebbf1ceb9e72c7','url':'/_next/static/chunks/main-75ebbf1ceb9e72c7.js'},{'revision':'3bd34936921d5949','url':'/_next/static/chunks/pages/User/%5Bid%5D-3bd34936921d5949.js'},{'revision':'c360eeceff986aa4','url':'/_next/static/chunks/pages/User/FollowTab-c360eeceff986aa4.js'},{'revision':'1463c60b851bc983','url':'/_next/static/chunks/pages/_app-1463c60b851bc983.js'},{'revision':'54de1933a164a1ff','url':'/_next/static/chunks/pages/_error-54de1933a164a1ff.js'},{'revision':'367542d2e16f6a6d','url':'/_next/static/chunks/pages/auth/SignIn-367542d2e16f6a6d.js'},{'revision':'22a22dc78471826a','url':'/_next/static/chunks/pages/auth/SignUp-22a22dc78471826a.js'},{'revision':'c4589f6162fc47e0','url':'/_next/static/chunks/pages/auth/SocialSuccess-c4589f6162fc47e0.js'},{'revision':'cef7a0fc53cdf3c3','url':'/_next/static/chunks/pages/detail/%5Bid%5D-cef7a0fc53cdf3c3.js'},{'revision':'acc752702dba3ea4','url':'/_next/static/chunks/pages/feed-acc752702dba3ea4.js'},{'revision':'eec2a4ff85888e99','url':'/_next/static/chunks/pages/findPassword/FindPwd-eec2a4ff85888e99.js'},{'revision':'a1073540d7adab8b','url':'/_next/static/chunks/pages/findPwdComplete/FindPwdComplete-a1073540d7adab8b.js'},{'revision':'b58d86f682ef0ee1','url':'/_next/static/chunks/pages/index-b58d86f682ef0ee1.js'},{'revision':'b17d8cb491e45aa7','url':'/_next/static/chunks/pages/post/Write-b17d8cb491e45aa7.js'},{'revision':'ee47c3f9ff1b96d3','url':'/_next/static/chunks/pages/search-ee47c3f9ff1b96d3.js'},{'revision':'1be1cb6d1730a0e8','url':'/_next/static/chunks/pages/setting/Setting-1be1cb6d1730a0e8.js'},{'revision':'7f05697937637c08','url':'/_next/static/chunks/pages/signUpComplete/SignUpComplete-7f05697937637c08.js'},{'revision':'3b0ea253dfbc7212','url':'/_next/static/chunks/pages/update/%5Bid%5D-3b0ea253dfbc7212.js'},{'revision':'79330112775102f91e1010318bae2bd3','url':'/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js'},{'revision':'460e88815b99d18b','url':'/_next/static/chunks/webpack-460e88815b99d18b.js'},{'revision':'6282dc91cb61b454','url':'/_next/static/css/6282dc91cb61b454.css'},{'revision':'c123d947f320f98588e49e7aa23b46ea','url':'/_next/static/media/b1.e39974f4.png'},{'revision':'51b9838cb78e4a526e85c799f74430b4','url':'/_next/static/media/google.a88402d8.png'},{'revision':'012bc2f98785c9a8cb2205b9ef640d28','url':'/_next/static/media/kakao.a3f0f075.png'},{'revision':'205910ad3a7b9cf6a29654ff43535602','url':'/_next/static/media/musiclibrary.3d192dd6.png'},{'revision':'73b708a40dff3b407bc6f2118b05822d','url':'/_next/static/media/naver.5f1f6f2f.png'},{'revision':'22c949772e46d931ce3207fb451b0e06','url':'/_next/static/media/pause.c9c9e111.png'},{'revision':'27bb96b70386f3ca30ec75108e583306','url':'/_next/static/media/play.58972bc8.png'},{'revision':'d6e69b74129de5adcb84910b3847478a','url':'/_next/static/media/record.13dab437.png'},{'revision':'7156541289c203140d9c0151c8e9849c','url':'/_next/static/media/youtube.c2797cc4.png'},{'revision':'e811d3204e74ff8f57c20424b0e5e6ab','url':'/addImage.png'},{'revision':'697eca19aa41d5422c2a68f986ade0a0','url':'/addpicture.svg'},{'revision':'c123d947f320f98588e49e7aa23b46ea','url':'/b1.png'},{'revision':'7b8929d17fac1687459f2098f5ff60da','url':'/b2.png'},{'revision':'7ec97bda668640236735829ca411bb23','url':'/b3.png'},{'revision':'8704c02a63a50b1ed5390466f4053281','url':'/c1.jpeg'},{'revision':'c123d947f320f98588e49e7aa23b46ea','url':'/c2.jpeg'},{'revision':'7b8929d17fac1687459f2098f5ff60da','url':'/c3.jpeg'},{'revision':'7ec97bda668640236735829ca411bb23','url':'/c4.jpeg'},{'revision':'cb981f4199ffdef95c26b53964b5a770','url':'/c5.jpeg'},{'revision':'2d29181a87b82e3ae68c341f3f8d4d51','url':'/data.ts'},{'revision':'dc88abb2430be4cc5f0bd8c28963ef3a','url':'/deletecomment.svg'},{'revision':'ff3937360c689c862dc746482a0ad32e','url':'/editcomment.svg'},{'revision':'74cfb88bc4ec62a5606712fd8e52c0d2','url':'/exclamationmark.svg'},{'revision':'18aa68899a524d35fe9a50096f192d7a','url':'/favicon.png'},{'revision':'51b9838cb78e4a526e85c799f74430b4','url':'/google.png'},{'revision':'b4eaebdd0346348280c7b5b799013a4e','url':'/inflearn.jpg'},{'revision':'012bc2f98785c9a8cb2205b9ef640d28','url':'/kakao.png'},{'revision':'573007fe8723fbd7b36fa4b8e8a1b698','url':'/locales/en/common.json'},{'revision':'d41d8cd98f00b204e9800998ecf8427e','url':'/locales/i18n.js'},{'revision':'f46811f78fafd050e23e17bfdfae2926','url':'/locales/ko/common.json'},{'revision':'caf4154b2b32dc7f911be2f52b2ac56f','url':'/logomain.png'},{'revision':'95d9e11f2a26ee2f6774a045ed79efa7','url':'/mainlogo.png'},{'revision':'aa812e8de7a38721f1db3432d4417c2e','url':'/manifest.json'},{'revision':'883ea328a5c09e9abdd28384a36b13cb','url':'/marker.svg'},{'revision':'d8ac79e035c632623c998a4ebb22985b','url':'/movecloud.gif'},{'revision':'8cf4f390a040f619dcd7cf3664acef71','url':'/music.png'},{'revision':'205910ad3a7b9cf6a29654ff43535602','url':'/musiclibrary.png'},{'revision':'73b708a40dff3b407bc6f2118b05822d','url':'/naver.png'},{'revision':'bc0e62f7d58be5a9fe8ae849393c20bd','url':'/nonepreset.png'},{'revision':'22c949772e46d931ce3207fb451b0e06','url':'/pause.png'},{'revision':'27bb96b70386f3ca30ec75108e583306','url':'/play.png'},{'revision':'ca0dc2e3e13d94680dda34e61f2d0163','url':'/preset1.PNG'},{'revision':'ab667751de06bfd98faeaf3554026b9d','url':'/preset2.PNG'},{'revision':'b493adcad3bf5dc18662060821613ab7','url':'/preset3.PNG'},{'revision':'ac3cbdd2839ca1addcf1689f89c2d8ca','url':'/presetData.ts'},{'revision':'48a06607738d229cc0731e33d393467e','url':'/profile.jpg'},{'revision':'d6e69b74129de5adcb84910b3847478a','url':'/record.png'},{'revision':'89a41f45acd8971797aa1da1626bea3e','url':'/secreteye.svg'},{'revision':'2d587aa23207119f07b7437df0f86954','url':'/service-worker.js'},{'revision':'167e5f5fa3968c9567a7ec9e643f5567','url':'/star.svg'},{'revision':'86f9eec10eae39594ac796e157c74832','url':'/startpagecloude.svg'},{'revision':'fa99ac663b6aa5734db015275afdbfa5','url':'/sw-custom.js'},{'revision':'a43b1e238b834f4f9ee84600ecc85ed9','url':'/sw.js'},{'revision':'50854bd889526f6d3af93e6223ebdc5d','url':'/userlike.svg'},{'revision':'aa3dbc9349a64fd8341cf19b4595271d','url':'/userpost.svg'},{'revision':'e6880399fa131bc79e3f616bdbfebaec','url':'/voice1.png'},{'revision':'eb073b0e485f6948eac2e5677f0981ad','url':'/voice2.png'},{'revision':'7156541289c203140d9c0151c8e9849c','url':'/youtube.png'},{'revision':'d41d8cd98f00b204e9800998ecf8427e','url':'/youtube.svg'},{'revision':'ecd944f5a841b813cc1d05eced317e20','url':'/🦆 icon _cloud_.svg'},{'revision':'6da3ca5d27abc708899300adbf139a1b','url':'/🦆 icon _image_.svg'},{'revision':'61dc8a3cda9b0354bdc06d144eabe56d','url':'/🦆 icon _star_.svg'}]);