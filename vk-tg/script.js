// Your data here

var tg_token = '613008844:AAFQuIhKwJBnrFrf9e2phT3D37c3P2t4Z2A' // Telegram bot API
var tg_chat_id = '-1001562294952' // Telegram chat id
var interval = 1000 // Check new message every [interval] ms
var msg_buffer = 250 // Buffer for messages. Lower buffer = lower pc usage
let msg_arr = []

//Start here
try {
	
var msgid = document.querySelectorAll('div[class="im-mess--text wall_module _im_log_body"]').length - 1 // Last message on page - dont change :)

setTimeout(() => {
	
	// Button
 
	var createdBut = document.createElement('button')
	createdBut.title = 'Пересылать сообщения в Telegram';
	createdBut.id = 'btnABS';
	createdBut.style.background="url(https://icons.iconarchive.com/icons/froyoshark/enkel/24/Telegram-icon.png) no-repeat"; // Author: http://froyoshark.deviantart.com
	createdBut.style.width='24px';
	createdBut.style.height='24px';
	createdBut.style.border='none';    
	createdBut.style.position='relative';
	createdBut.style.bottom='-6px';

	document.querySelectorAll('div[class="im-chat-input--attach"]')[0].insertAdjacentHTML('beforebegin', createdBut.outerHTML);
	document.getElementById('btnABS').onclick = function() { //Main function

		setInterval(() => { // Interval
			if (msg_arr.length > msg_buffer) { 
				console.log('Превышен буфер отправки');
				location.reload;
			}
			
			if (msg_arr.includes(msgid)) { msgid++ } else {
				if (document.querySelectorAll('div[class="im-mess--text wall_module _im_log_body"]')[msgid]) {
					msg_arr.push(msgid)
					if (document.querySelectorAll('div[class="im-mess--text wall_module _im_log_body"]')[msgid].firstElementChild == "a") { // If msg contain any links
						if (document.querySelectorAll('div[class="im-mess--text wall_module _im_log_body"]')[msgid].firstElementChild.getAttribute("title") == null) {} 
						var message = document.querySelectorAll('div[class="im-mess--text wall_module _im_log_body"]')[msgid].firstElementChild.getAttribute("title")
					} else { 
						var message = document.querySelectorAll('div[class="im-mess--text wall_module _im_log_body"]')[msgid].innerText
					}

					if (message == "") {} else {
						var message = encodeURIComponent(message);
						let request1 = new XMLHttpRequest();
						request1.open("GET", "https://api.telegram.org/bot"+ tg_token +"/sendMessage?chat_id="+ tg_chat_id +"&text="+ message +"&parse_mode=Markdown", true);
						request1.send();
					}
					msgid++
				
				} else {
					msgid--
				}
			}
		}, interval);
	};
}, 5000);

} catch (err) { 
	console.log('Ошибка! Для корректной работы зайдите в диалог заполните необходимые данные');
}