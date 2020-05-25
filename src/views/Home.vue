<template>
  <div>
  <div class="bgimg-1">
    <div class="caption">
      <span class="border">Metete...</span>
      </div>
    </div>    
    <div class="bgimg-2">
      <div class="caption">
      <span class="border" style="background-color:transparent;font-size:25px;color: #f7f7f7;">En...</span>
      </div>
    </div>
    <div class="bgimg-3">
      <div class="caption">
      <span class="border" style="background-color:transparent;font-size:25px;color: #f7f7f7;">La página...</span>
      </div>
    </div>
    <div class="bgimg-1">
      <div class="caption">
      <span class="border">Insecto</span>
      </div>
    </div>  
  </div>
</template>

<script>

export default {
  name: 'Home',
  // components: {
  //   HelloWorld
  // }
}
</script>

<style scoped>   
    .bgimg-1, .bgimg-2, .bgimg-3 {
      position: relative;
      opacity: 0.65;
      width: 100vw;
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    
    }
    .bgimg-1 {
      background-image: url("../assets/img_parallax.jpg");
      min-height: 800px;
    }
    
    .bgimg-2 {
      background-image: url("../assets/img_parallax2.jpg");
      min-height: 400px;
    }
    
    .bgimg-3 {
      background-image: url("../assets/img_parallax3.jpg");
      min-height: 400px;
    }
    
    .caption {
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      text-align: center;
      color: #000;
    }
    
    .caption span.border {
      background-color: #111;
      color: #fff;
      padding: 18px;
      font-size: 25px;
      letter-spacing: 10px;
    }
    
    h3 {
      letter-spacing: 5px;
      text-transform: uppercase;
      font: 20px "Lato", sans-serif;
      color: #111;
    }
</style>