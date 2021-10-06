<template>
<div class="search">
  <input v-on:input="typing" v-bind:value="input" placeholder="검색" class="input">
  <button class="auth" @click="login()">학생인증</button>
</div>

<div class="main">
  <div class="test" @click="viewImage(index)" v-bind:class="test['subject']" v-for="(test, index) in filteredList" :key="index">
    <div class="desc">
      {{test['year']}}년
    </div>
    <div class="desc">
      {{test['grade']}} 학년
      {{test['semester'][0]}} 학기
    </div>
    <div class="desc">
        {{test['exam']}}
    </div>
    <div class="desc subject">
      {{test['subject']}}
    </div>
    <div class="desc" v-for="(teacher, index) in test['teacher']" :key="index">
      {{teacher}} 선생님
    </div>
    <div class="desc" v-if="test['teacher'].length == 1">
      X
    </div>
  </div>
</div>
<div class="desc-login">다운로드는 학생인증 후 사용 가능합니다.</div>


</template>

<script>
import axios from 'axios';


export default {
  name: 'App',
  data() {
    return {
      user: '',
      userPW: '',
      testList: [],
      filteredList: [],
      input: '',
      searchElement: {
        year: '',
        grade: '',
        semester: '',
        exam: '',
        subject: '',
        teacher: '',
      },
      baseURI: 'http://localhost:4000'
      // baseURI: 'https://jangseungtest.run.goorm.io'
    }
  },
  mounted() {
    this.getTestList();
  },
  methods: {
    getTestList: function() {
      let url = this.baseURI + '/testList';

      axios.post(url).then(res => {
        this.testList = res.data.testList;
        this.filteredList = this.testList;
      });
    },
    login: function() {
      var input = prompt("학번@인증번호를 입력하세요\n(*학번만 입력시 인증번호가 학교 메일로 전송됩니다.)\n*(학생 인증을 해야 다운받을 수 있습니다.)", "");
      var splitedInput = [];

      try {
        splitedInput = input.split('@');
      } catch {
        return;
      }

      this.user = splitedInput[0];
      this.userPW = splitedInput[1];

      console.log(this.user, this.userPW);
    },

    viewImage: function(index) {
      let url = this.baseURI + '/downloadTest';
      let data = {
        fileName: this.filteredList[index]['testName'],
        user: this.user,
        userPW: this.userPW,
      }

      axios({
        method: 'POST',
        url: url,
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data], {type: res.headers['content-type']}));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${this.filteredList[index]['testName']}.pdf`);
        document.body.appendChild(link);
        link.click();
      });
    },
    typing: function(e) {
      this.input = e.target.value;
      this.filterInput();
      this.filterTestList();

    },
    filterTestList: function() {
      this.filteredList = [];

      let testList = this.testList;
      let result = [];
      let elements = Object.keys(this.searchElement);
      let check = true;

      for (var i=0; i<testList.length; i++) {
        check = true;
        for (var a=0; a<elements.length; a++) {

          if (this.searchElement[elements[a]] == '') {
            continue;
            
          }
          if (this.searchElement[elements[a]] != testList[i][elements[a]]) {
            check = false;
            break;
          }
        }

        if (check) {
          result.push(testList[i]);
        }
      }

    this.filteredList = result;
    },
    filterInput: function() {
      let words = this.input.split(' ');
      this.searchElement = {
        year: '',
        grade: '',
        semester: '',
        exam: '',
        subject: '',
        teacher: ''
      };

      for (var i=0; i<words.length; i++) {
        switch (words[i]) {
          case '1학기':
            this.searchElement.semester = '1st';
            break;
          case '2학기':
            this.searchElement.semester = '2nd';
            break;

          case '1학년':
            this.searchElement.grade = 1;
            break;
          case '2학년':
            this.searchElement.grade = 2;
            break;
          case '3학년':
            this.searchElement.grade = 3;
            break;

          case '수학':
            this.searchElement.subject = '수학';
            break;
          case '과학':
            this.searchElement.subject = words[i];
            break;
          case '사회':
            this.searchElement.subject = words[i];
            break;
          case '역사':
            this.searchElement.subject = words[i];
            break;
          case '정보':
            this.searchElement.subject = words[i];
            break;
          case '체육':
            this.searchElement.subject = words[i];
            break;
          case '음악':
            this.searchElement.subject = words[i];
            break;
          case '한문':
            this.searchElement.subject = words[i];
            break;
          case '미술':
            this.searchElement.subject = words[i];
            break;
          case '영어':
            this.searchElement.subject = words[i];
            break;
          case '국어':
            this.searchElement.subject = words[i];
            break;
          case '도덕':
            this.searchElement.subject = words[i];
            break;
          case '기술':
            this.searchElement.subject = words[i];
            break;
          case '가정':
            this.searchElement.subject = words[i];
            break;

          case '2018':
            this.searchElement.year = 2018;
            break;
          case '2018년':
            this.searchElement.year = 2018;
            break;
          case '2019':
            this.searchElement.year = 2019;
            break;
          case '2019년':
            this.searchElement.year = 2019;
            break;
          case '2019년도':
            this.searchElement.year = 2019;
            break;

          case '2020':
            this.searchElement.year = 2020;
            break;
          case '2020년':
            this.searchElement.year = 2020;
            break;
          case '2020년도':
            this.searchElement.year = 2020;
            break;

          case '2021':
            this.searchElement.year = 2021;
            break;
          case '2021년':
            this.searchElement.year = 2021;
            break;
          case '2021년도':
            this.searchElement.year = 2021;
            break;

          case '중간고사':
            this.searchElement.exam = 'mid';
            break;
          case '중간':
            this.searchElement.exam = 'mid';
            break;
          case '기말고사':
            this.searchElement.exam = 'final';
            break;
          case '기말':
            this.searchElement.exam = 'final';
            break;
        }
      }
    }
  }
}
</script>

<style>
@font-face {
    font-family: 'IM_Hyemin-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Bold.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
}

html, body, #app {
  color:#353535;
  overflow-x: hidden;
  margin: 0;
  height: 100vh;
  width: 100vw;
}

#app {
  font-family: IM_Hyemin-Bold;
}

.search {
  margin: 0;
  padding: 0;

  width: 100%;
  height: 55px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  overflow-x: hidden;
  background-color: #D7FFF1;
  box-shadow: 0 0 11px rgba(40,40,40,.2); 

}

input {
  color: #353535;
  display: inline-block;
  font-family: 'IM_Hyemin-Bold';
  height: 35px;
  width: 45%;
  border-radius: 10px;
  padding: 7px;
  outline: none;
  border: none;
  caret-color: dodgerblue;
  box-shadow: 0 0 11px rgba(40,40,40,.2); 
  font-size: 25px;
}

.auth {
  font-family: 'IM_Hyemin-Bold';
  font-size: 25px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  box-shadow: 0 0 11px rgba(40,40,40,.2); 
  padding: 7px;
  height: 50px;
  margin-left: 15px;
}

.main {
  text-align: center;
  position: absolute;
  width: 100%;
  padding-bottom: 50px;
}

.test {
  text-align: center;
  display: inline-block;
  border-radius: 20px;
  margin: 15px;
  padding: 5px;
  width: 120px;
  height: 150px;
  transition: all .2s ease-out;
  box-shadow: 0 0 11px rgba(40,40,40,.2); 
}

.download {
  background-color: white;
  width: 70%;
  margin: auto;
  border-radius: 20px;
  cursor: pointer;
}



a {
  text-decoration: none;
  color: grey;
}

.미술 {
  background-color: #FFD3D9;
}

.미술-download {
  color: #F578BC;  
}

.음악 {
  background-color: #D1B6E1;
}

.음악-download {
  color: #A593E0;  
}

.수학 {
  background-color: #EC7357;
}

.수학-download {
  color: #DE6449;  
}

.과학 {
  background-color: #67D5B5;
}

.과학-download {
  color: #5CAB7D;  
}

.영어 {
  background-color: #84B1ED;
}

.영어-download {
  color: #4F86C6;  
}

.국어 {
  background-color: #ED9282;
}

.국어-download {
  color: #DE7E73;  
}

.체육 {
  background-color: #f6ea8c;
}

.체육-download {
  color: #FFBC42;  
}

.역사 {
  background-color: #FDD692;
}

.역사-download {
  color: #F6B352;  
}

.한문 {
  background-color: #D09E88;
}

.한문-download {
  color: #754F44;  
}

.도덕 {
  background-color: #ff5f2e;
}

.도덕-download {
  color: #ff7761;  
}

.사회 {
  background-color: #4ea1d3;
}

.사회-download {
  color: #004e66;  
}

.정보 {
  background-color: #EFFFE9;
}

.정보-download {
  color: #41D3BD;  
}

.가정 {
  background-color: #C5E99B;
}

.가정-download {
  color: #AACD6E;  
}

.기술 {
  background-color: #dae9f4;
}

.기술-download {
  color: #7f9eb2;  
}
.subject {
  font-size: 37px;
}



.image {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: rgba(0, 0, 0, 0.5);
}

.image-background {
  margin: auto;
  background: white;
  border-radius: 8px;
  padding: 10px;
}

.i {
  height: 85vh;
}

.desc-login {
  width: 100%;
  position: fixed;
  left: 0;
  clear: left;
  bottom: 0;
  text-align: center;
  background-color: white;
  padding: 10px;
}
</style>
