// Your data here

var tg_token = 'Ваш:токен' // Telegram bot token
var tg_chat_id = '-Вашчатid' // Telegram chat id
var interval = 1000 // Check new message every [interval] ms
var msg_buffer = 250 // Buffer for messages. Lower buffer = lower pc usage

//Start here

let msg_arr = []	
var msgid = document.querySelectorAll('div[class="im-mess--text wall_module _im_log_body"]').length - 1 // Last message on page - dont change :)
if (msgid == 0) { 
	console.log('Для корректной работы зайдите в диалог и заполните необходимые данные');
	fail;
}

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
					if (document.querySelectorAll('div[class="im-mess--text wall_module _im_log_body"]')[msgid].childElementCount > 1) {
						try {
							var message = document.querySelectorAll('div[class="im-mess--text wall_module _im_log_body"]')[msgid].firstElementChild.getAttribute("title")
						} catch (err) {
							var message = document.querySelectorAll('div[class="im-mess--text wall_module _im_log_body"]')[msgid].firstElementChild.getAttribute("onclick")
						} 
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
