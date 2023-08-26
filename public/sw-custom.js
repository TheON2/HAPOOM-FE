importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js'
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

self.addEventListener('push', function (event) {
  console.log('진입함 푸시');
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  const data = event.data.json();

  console.log(data);

  const options = {
    body: data.content,
    icon: './logomain.png',
    badge: './logomain.png',
    data: { url: data.url }, // URL을 options에 추가
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function (event) {
  // 알림 클릭 이벤트 처리
  event.notification.close(); // 클릭한 알림 닫기

  // 알림 데이터에서 URL 가져오기 (서버에서 보낸 알림 데이터에 url을 포함시켜야 함)
  var url = event.notification.data.url;

  // 해당 URL로 이동
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
