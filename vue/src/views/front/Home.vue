<template>
  <div>
    <div style="width:800px;margin: 10px auto">
      <el-carousel height="450px" :interval="3000">
        <el-carousel-item v-for="item in imgs" :key="item">
          <img :src="item" alt="" style="width: 774px;height: 435px">
        </el-carousel-item>
      </el-carousel>
      <div class="info">
        <p style="margin: 1em;font-size: 1.5em;font-weight: 700;color: white">Now here?</p>
        <p>
          <a href="/register" style="color: #0cd;cursor: pointer">Create a new account!</a>
          <span style=" color:#fff"> - or - </span>
          <a href="/login" style="color: #0cd;cursor: pointer">Log in</a>
        </p>
      </div>
    </div>
    <div style="margin: 10px 0">
      <el-row :gutter="10">
        <el-col :span="6" v-for="item in papers" :key="item.id" style="margin-bottom: 5px">
          <div style="padding-bottom: 10px">
            <a href=""><img :src="item.url" alt="" style="width: 100%"></a>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin: 10px 0">
      <el-row :gutter="10">
        <el-col :span="4" v-for="item in midImgs" :key="item" style="margin-bottom: 5px">
          <div style="padding-bottom: 10px">
            <a href=""><img :src="item" alt="" style="width: 100%"></a>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin: 10px 0">
      <el-row :gutter="10">
        <el-col :span="3" v-for="item in miniImgs" :key="item" style="margin-bottom: 5px">
          <div style="padding-bottom: 10px">
            <a href=""><img :src="item" alt="" style="width: 100%"></a>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="discuss">
      <div class="discuss-left">
        <section>
          <h2 style="color: white;font-size:16px;border: 0 solid transparent;">Latest discussions on our forums</h2>
          <el-divider></el-divider>
          <span>
            <img src="../../assets/ai1.png" style="width: 35px; height: 35px">
            <span style="margin-left: 20px;color: grey">青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
          </span>
          <el-divider></el-divider>
          <span><img src="../../assets/ai3.jpg" style="width: 35px; height: 35px">
            <span style="margin-left: 20px;color: grey">少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span></span>
          <el-divider></el-divider>
          <span><img src="../../assets/ai4.jpg" style="width: 35px; height: 35px">
            <span style="margin-left: 20px;color: grey">青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span></span>
          <el-divider></el-divider>
          <span><img src="../../assets/ai5.png" style="width: 35px; height: 35px">
            <span style="margin-left: 20px;color: grey">少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span></span>
          <el-divider></el-divider>
          <span><img src="../../assets/ai1.png" style="width: 35px; height: 35px">
            <span style="margin-left: 20px;color: grey">青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span></span>
          <el-divider></el-divider>
          <p style="text-align: center">
            <el-button type="success">Check out our forums!</el-button>
          </p>
        </section>
      </div>
      <div class="discuss-left">
        <h3 style="color: white">wallhaven stats</h3>
        <el-divider></el-divider>
        <p>
          wallhaven.cc is home to
          <strong>1,029,518</strong>
          high quality wallpapers which have been viewed a total of
          <strong>2.77 billion</strong>
          times!
        </p>
        <p>
          We have
          <strong>972,743</strong>
          awesome users, of whom
          <strong>599</strong>
          are online right now!
        </p>
        <p>
          Not sure what to search for? We're sure at least one of our
          <strong>80,523</strong>
          user created
          <a href="https://wallhaven.cc/tags" style="color: #0cd;cursor: pointer">tags</a>
          will help you find something!
        </p>
      </div>
    </div>
<!--    <div>-->
<!--      <div style="width: 850px;height: 25px;margin: 50px auto;background-color: transparent;">-->
<!--        <span style="font-size:14px;color: gray;">-->
<!--          <a href="https://wallhaven.cc/about#Copyright">All images remain property of their original owners. </a>-->
<!--            Site & code © wallhaven.cc 2022.-->
<!--          <a href="https://wallhaven.cc/privacy-policy">Privacy Policy</a> ·-->
<!--          <a href="https://wallhaven.cc/terms">Terms of Service</a></span>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "FrontHome",
  data() {
    return {
      imgs: [
        'https://w.wallhaven.cc/full/1p/wallhaven-1p398w.jpg',
        'https://w.wallhaven.cc/full/7p/wallhaven-7p39gy.png',
        'https://w.wallhaven.cc/full/qz/wallhaven-qzdqvr.jpg',
        'https://w.wallhaven.cc/full/zy/wallhaven-zyxvqy.jpg'
      ],
      midImgs: [
        'https://th.wallhaven.cc/small/6o/6oxgp6.jpg',
        'https://th.wallhaven.cc/small/j3/j3g7yy.jpg',
        'https://th.wallhaven.cc/small/v9/v9kw9l.jpg',
        'https://th.wallhaven.cc/small/k7/k7q9m7.jpg',
        'https://th.wallhaven.cc/small/y8/y8622k.jpg',
        'https://th.wallhaven.cc/small/l3/l3xk6q.jpg'
      ],
      miniImgs: [
        'https://th.wallhaven.cc/small/y8/y86g17.jpg',
        'https://th.wallhaven.cc/small/57/57o9j5.jpg',
        'https://th.wallhaven.cc/small/y8/y8lqo7.jpg',
        'https://th.wallhaven.cc/small/1k/1ky369.jpg',
        'https://th.wallhaven.cc/small/x8/x8ye3z.jpg',
        'https://th.wallhaven.cc/small/6o/6ozkzl.jpg',
        'https://th.wallhaven.cc/small/wq/wqve97.jpg',
        'https://th.wallhaven.cc/small/v9/v9v3r5.jpg'
      ],
      papers: []
    }
  },
  created() {
    this.request.get("/wallpaper/front/all").then(res => {
      // console.log(res.data)
      // this.papers = res.data.filter(v => v.type === 'png' || v.type === 'jpg' || v.type === 'webp')
      this.papers = res.data;
    })
  },
  methods: {}
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: gray;
}

a:hover {
  color: #409EFF;
}

.info {
  display: flex;
  height: 70px;
  width: 750px;
  justify-content: center;
  margin: 1em;
  align-items: center;
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .2) 10%, rgba(0, 0, 0, .2) 90%, rgba(0, 0, 0, 0) 100%);
}

img {
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgb(0 0 0 / 50%);
}

.discuss {
  max-width: 1600px;
  margin: 2em auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.discuss-left {
  padding: 1em;
  text-align: left;
  background: rgba(0, 0, 0, .2);
  width: 45%;
}

section {
  margin: 0;
  background: 0 0;
  box-shadow: none;
}

li {
  list-style: none;
}

p {
  font-size: 14px;
  color: white;
  margin-top: 10px;
}

strong {
  font-size: 17px
}
</style>
