<template>

  <div>
    <input type="file" multiple accept="image/*" @change="detectFiles($event.target.files)">
    <div class="progress-bar" :style="{ width: progressUpload + '%'}">{{ progressUpload }}%</div><br>download Url: {{downloadURL}}

  </div>

</template>

<script>
import firebase from './firebase'
export default {
  name: 'ImageUpload',
  props: ['dstPath'],
  data () {
    return {
      progressUpload: 0,
      file: File,
      uploadTask: '',
      downloadURL: null
    }
  },
  methods: {
    detectFiles (fileList) {
      Array.from(Array(fileList.length).keys()).map( x => {
        this.upload(fileList[x])
      })
    },
    upload (file) {
      this.uploadTask = firebase.storage().ref(`images/${this.dstPath}`).put(file);
      this.uploadTask.then(snapshot => {
        snapshot.ref.getDownloadURL().then((url) => {
          this.downloadURL = url
          this.$emit('url', this.downloadURL)
        })
      })
    }
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on('state_changed', sp => {
        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      })
    }
  }
}
</script>

<style>
.progress-bar {
  margin: 10px 0;
}
</style>

