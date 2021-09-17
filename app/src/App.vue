<template>
<div>
  <input v-on:input="typing" v-bind:value="input" placeholder="검색" class="input">
</div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'App',
  data() {
    return {
      testList: [],
      input: '',
      searchElement: {
        year: '',
        grade: '',
        semester: '',
        exam: '',
        subject: '',
        teacher: '',
      },
      baseURI: 'http://localhost:5000'
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
      });
    },
    typing: function(e) {
      this.input = e.target.value;
      this.filterInput();
      console.log(this.input);
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
          case '2018년도':
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
            this.searchElement.exam = 'midterm';
            break;
          case '중간':
            this.searchElement.exam = 'midterm';
            break;
          case '기말고사':
            this.searchElement.exam = 'final';
            break;
          case '기말':
            this.searchElement.exam = 'final';
            break;
        }
      }
      console.log(this.searchElement);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
