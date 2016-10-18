self.addEventListener('push', function(event) {
    console.log('Push message', event);
    event.waitUntil(
        self.registration.showNotification('Push message', {
            body: 'The Message',
            icon: 'images/icon.png',
            tag: 'my-tag'
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag', event.notification.tag);
    event.notification.close();
    var url = 'http://www.gug.cz/';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
            .then(function(windowClients) {
                console.log('WindowClients', windowClients);
                for (var i = 0; i < windowClients.length; i++) {
                    var client = windowClients[i];
                    console.log('WindowClient', client);
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
