//显示可疑的文本，它会净化文本，将特殊字符转换成HTML实体
function divEscapedContentElemnt(message){
	return $('<div></div>').text(message);
}
//用来显示系统创建的受信内容，而不是其他用户创建的。
function divSystemContentElement(message){
	return $('<div></div>').html('<i>'+message+'</i>')
}
//用来处理用户输入的，如果用户输入的内容以斜杠（/）开头，它会将其作为聊天命令处理，如果不是，就作为聊天消息发送给服务器并广播给其他用户，并添加到用户所在聊天室的聊天文本中
function processUserInput(chatApp,socket){
	var message = $('#send-message').val();
	var systemMessage;
	if(message.chatAt(0) == '/'){
		systemMessage = chatApp.processCommand(message);
		if(systemMessage){
			$('#messages').append(divSystemContentElement(systemMessage));
		}
	}else{
		//将非命令输入的广播给其他用户
		chatApp.sendMessage($('#room').text(),message);
		$('#messages').append(divEscapedContentElemnt(message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}
	$('#send-message').val('');
}
//在用户的浏览器加载完页面后执行，这段代码会对客户端的Socket.IO事件处理进行初始化
var socket = io.connect();
$(document).ready(function(){
	var chatApp = new Chat(socket);
	socket.on('nameResult',function(result){
		//显示更名尝试的结果
		var message;
		if(result.success){
			message = 'You are now know as '+result.name+'.';
		}else{
			message = result.message;
		}
		$('#messages').append(divSystemContentElement(message));
	});
	socket.on('joinResult',function(result){
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room changed.'))
	})
	socket.on('rooms',function(rooms){
		//显示可用房间列表
		$('#room-list').empty();
		for(var room in rooms){
			$('#room-list').append(divEscapedContentElemnt(room));
		}
		$('#room-list div').click(function(){
			chatApp.processCommand('/join '+$(this).text());
			$('#send-message').focus();
		});
	});
	//定期请求可用房间列表
	setInterval(function() {
		socket.emit('rooms');
	},1000);
	$('#send-message').focus();
	//提交表单可以发送聊天消息
	$('#send-form').submit(function(){
		processUserInput(chatApp,socket);
		return false;
	})
})