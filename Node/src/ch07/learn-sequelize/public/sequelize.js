document.querySelectorAll('#user-list tr').forEach((el) => {
  el.addEventListener('click', () => {
    let id = el.querySelector('td').textContent;
    getComment(id);
  });
});

// 사용자 로딩
let getUser = () => {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if(xhr.status === 200) {
      let users = JSON.parse(xhr.responseText);
      console.log(users);

      let tbody = document.querySelector('#user-list tbody');
      tbody.innerHTML = '';

      users.map((user) => {
        let row = document.createElement('tr');
        // 유저 tr 클릭 시 해당 comment 호출
        row.addEventListener('click', () => {
          getComment(user.id);
        });
        
        let td = document.createElement('td');
        td.textContent = user.id;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = user.name;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = user.age;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = user.married ? '기혼' : '미혼';
        row.appendChild(td);

        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('GET', '/users');
  xhr.send();
}

// 댓글 로딩
let getComment = (id) => {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if(xhr.status === 200) {
      let comments = JSON.parse(xhr.responseText);
      console.log(comments);

      let tbody = document.querySelector('#comment-list tbody');
      tbody.innerHTML = '';

      comments.map((comment) => {
        let row = document.createElement('tr');

        let td = document.createElement('td');
        td.textContent = comment.id;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = comment.user.name;
        row.appendChild(td);

        td = document.createElement('td');
        td.textContent = comment.comment;
        row.appendChild(td);

        // 수정 버튼
        let edit = document.createElement('button');
        edit.textContent = '수정';
        edit.addEventListener('click', () => {
          let newComment = prompt('바꿀 내용을 입력하세요');
          if(!newComment) {
            return alert('내용을 반드시 입력해야합니다');
          }
          
          let xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if(xhr.status === 200) {
              console.log(xhr.responseText);
              getComment(id);
            } else {
              console.error(xhr.responseText);
            }
          };

          xhr.open('PATCH', '/comments/' + comment.id);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({ comment : newComment }));
        });

        // 삭제 버튼
        let remove = document.createElement('button');
        remove.textContent = '삭제';
        remove.addEventListener('click', () => {
          let xhr = new XMLHttpRequest();
          xhr.onload = () => {
            if(xhr.status === 200) {
              console.log(xhr.responseText);
              getComment(id);
            } else {
              console.error(xhr.responseText);
            }
          };

          xhr.open('DELETE', '/comments/' + comment.id);
          xhr.send();
        });

        td = document.createElement('td');
        td.appendChild(edit);
        row.appendChild(td);

        td = document.createElement('td');
        td.appendChild(remove);
        row.appendChild(td);

        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };

  xhr.open('GET', '/comments/' + id);
  xhr.send();
}

// 사용자 등록
document.getElementById('user-form').addEventListener('submit', (e) => {
  e.preventDefault();
  let name = e.target.username.value;
  let age = e.target.age.value;
  let married = e.target.married.checked;

  // 값이 없는 경우 alert 함수를 리턴시켜 함수를 종료시킴
  if(!name) return alert('이름을 입력해주세요');
  if(!age)  return alert('나이를 입력하세요');

  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if(xhr.status === 201) {
      console.log(xhr.responseText);
      getUser();
    } else {
      console.error(xhr.responseText);
    }
  };
  
  xhr.open('POST', '/users');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify( { name : name, age : age, married : married } ));

  e.target.username.value = '';
  e.target.age.value = '';
  e.target.married.checked = false;
});

// 댓글 등록
document.getElementById('comment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  let id = e.target.userid.value;
  let comment = e.target.comment.value;
  if(!id)       return alert('아이디를 입력하세요');
  if(!comment)  return alert('댓글을 입력하세요');

  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if(xhr.status === 201) {
      console.log(xhr.responseText);
      getComment(id);
    } else {
      console.error(xhr.responseText);
    }
  };

  xhr.open('POST', '/comments');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ id : id, comment : comment }));
  e.target.userid.value = '';
  e.target.comment.value = '';

});