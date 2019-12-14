<template>
  <a-layout id="components-layout-demo-responsive" >
    <a-layout-sider
    style="position:fixed;z-index:100;min-height:500px"
      breakpoint="lg"
      collapsedWidth="0"
    >
      <div style="text-align:center;padding:10px;background-color:#f3f3f3"><span> <b>Person List</b> </span></div>
      <a-tree style="" @select="onSelect"   :treeData="treeData" showIcon showLine   >
        
        <template slot="actor"   >
        <svgicon icon="famous" width="22" height="18"  ></svgicon>
        </template>
        
        <template slot="scientist"    >
        <svgicon icon="scientist"  width="22" height="18"  ></svgicon>
        </template>

        <template slot="politician"  >
        <svgicon icon="politician" width="22" height="18"  ></svgicon>
        </template>
        
        <template slot="international"   >
          <svgicon icon="united-kingdom" width="22" height="18"  ></svgicon>
        </template>

        <a-icon  slot="switcherIcon" type="down" />
        <template slot="indonesia"  >
          <svgicon icon="indonesia"  width="22" height="18" ></svgicon>
        </template>

        <a-icon  slot="sub1" type="user" />
      </a-tree>
    </a-layout-sider>
    <a-layout class="rightLayout">
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <h3 style="padding:20px;background-color:#fff;border:solid 1px #e2e2e2">Result For : 
        <!-- <span v-if="name ==null">Name Here</span> -->
        <transition name="fadeLeft">
        <span v-if="name !==null">
         {{name}}
        </span>
        </transition> 
        </h3>
        <!-- <a-divider /> -->
        <div :style="{ padding: '24px', background: '#fff', minHeight: '300px' }">
        <div style="text-align:center;margin-top:80px" v-if="items.length == 0 && request == false" >
          <a-icon style="font-size:30px" type="laptop" />
          <p style="text-align:center;font-size:12px;color:e2e2e2">Your result will displayed here</p>
        </div>
        <div style="text-align:center;margin-top:80px" v-if="loading == true && request == true">
          <a-icon type="loading" />
        </div>
         <a-row>
           <transition-group name="fadeUp">
             <a-col style="padding:15px" :md="{span : 8}" v-for="(item, index) in items" :key="index">
            <a-card v-scroll-to="'#display'" hoverable style="width: 100%" @click="goto(item)" >
              <img
                class="imageCard"
                style=""
                alt="example"
                :src="item.pagemap.cse_thumbnail[0].src"
                slot="cover"
              />
              <a-card-meta :title="item.title">
                <template slot="description">{{item.link.length >20 ? item.link.substring(0,20) +'  ...': item.link}}</template>
              </a-card-meta>
            </a-card>
           </a-col>
           </transition-group>
         </a-row>
        </div>
      </a-layout-content>

      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <h3 style="padding:20px;background-color:#fff;border:solid 1px #e2e2e2">Display For : 
        <!-- <span v-if="name ==null">Name Here</span> -->
        <transition name="fadeLeft">
        <span v-if="title !==null">
         {{title}}
        </span>
        </transition> 
        </h3>

        <div  id="display" :style="{ padding: '24px', background: '#fff', minHeight: '300px', marginBottom:'30px' }">
        <div style="text-align:center;margin-top:80px" v-if="title == null && request2 == false" >
          <a-icon style="font-size:30px" type="picture" />
          <p style="text-align:center;font-size:12px;color:e2e2e2">Your display will be here</p>
        </div>
        <div style="text-align:center;margin-top:80px" v-if="loading2 == true && request == true">
          <a-icon type="loading" />
          <p style="font-size:12px;color:e2e2e2">Try to choose another one if display not loaded</p>
        </div>
        <transition name="fade">
          <iframe v-if="iframe !==''" :class="{ 'loading' : !iframeLoaded }" @load="iframeLoad" :src="iframe" allowfullscreen></iframe>
        </transition>
        </div>
      </a-layout-content>
      
    </a-layout>
  </a-layout>
</template>

<script>
import './compiled-icons';
import './App.css'
export default {
  data(){
    return {
      name : null, 
      title : null, 
      treeData, 
      items : [], 
      request : false, 
      request2 : false, 
      loading : false, 
      loading2 : false, 
      iframe : '', 
      iframeLoaded: false
    }
  }, 
  name: 'app',
  methods : {
     onSelect(selectedKeys, info) {
       var name = info.selectedNodes[0].data.props.title
       this.items = []
       this.loading = true
       this.request = true
       this.name = null
       this.axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyCx1H94esmCBlJoiAYRyWVO-HLlr5FGW4o&cx=012094787093910058037:dp2kuqvxrly&q='+name)
       .then((res)=>{
         var data = res.data.items
         this.name = name
         this.loading = false
         data.map(x=>{
           if(typeof  x.pagemap.cse_thumbnail != "undefined"){
             this.items.push(x)
           }
         })
       })
       .catch(e=>{
          console.log(e)
          this.$message.error('An error occure, try to choose the another one');
          this.loading = false
        })
      }, 
      goto(x){
        this.iframe = ''
        this.loading2 = true
        this.request2 = true
        this.title = null
        setTimeout(()=>{
          this.title = x.title
          this.iframe = x.link
          this.loading2 = false
        }, 3000)
      }, 
      iframeLoad(e) {
        console.log(e)
      if (e.timeStamp < 10000) {
        console.log("Hello")
        // this.iframeLoaded = false;
      }
    }
  }, 
}

const treeData = [
  {title: 'ACTOR',
      key: '0-0',
      slots: {
        icon: 'actor' 
      },
      selectable :false, 
      children : [
      // International
      {
      title: 'International',
      key: '0-1',
      slots: {
        icon: 'international' 
      },
      selectable :false, 
      children: [
        { title: 'Tom Cruise',  key: '0-1-0', slots: { icon: 'sub1' }},
        { title: 'Johny Depp', key: '0-1-1', scopedSlots: { icon: 'sub1' }},
        { title: 'Lindsay Lohan', key: '0-1-2', scopedSlots: { icon: 'sub1' }}
        ],
      }, 
      // Indonesia
      {
      title: 'Indonesia',
      key: '0-2',
      slots: {
        icon: 'indonesia' 
      },
      selectable :false, 
      children: [
        { title: 'Baim Wong',  key: '0-2-0', slots: { icon: 'sub1' }},
        { title: 'Reza Rahardian', key: '0-2-1', scopedSlots: { icon: 'sub1' } },
        { title: 'Iko Uwais', key: '0-2-2', scopedSlots: { icon: 'sub1' } }
        ],
      }, 
    ]
    }, 
    {title: 'SCIENTIST',
      key: '1-0',
      slots: {
        icon: 'scientist' 
      },
      selectable :false, 
      children : [
      // International
      {
      title: 'International',
      key: '1-1',
      slots: {
        icon: 'international' 
      },
      selectable :false, 
      children: [
        { title: 'Ibnu Sina',  key: '1-1-0', slots: { icon: 'sub1' }},
        { title: 'Albert Einstein', key: '1-1-1', scopedSlots: { icon: 'sub1' }},
        { title: 'Issac Newton', key: '1-1-2', scopedSlots: { icon: 'sub1' }}
        ],
      }, 
      // Indonesia
      {
      title: 'Indonesia',
      key: '1-2',
      slots: {
        icon: 'indonesia' 
      },
      selectable :false, 
      children: [
        { title: 'Khoirul Anwar',  key: '1-2-0', slots: { icon: 'sub1' }},
        { title: 'Irwandi Jaswir', key: '1-2-1', scopedSlots: { icon: 'sub1' } },
        { title: 'BJ Habibie', key: '1-2-2', scopedSlots: { icon: 'sub1' } }
        ],
      }, 
    ]
    }, 
    {title: 'POLITICIAN',
      key: '3-0',
      slots: {
        icon: 'politician' 
      },
      selectable :false, 
      children : [
      // International
      {
      title: 'International',
      key: '3-1',
      slots: {
        icon: 'international' 
      },
      selectable :false, 
      children: [
        { title: 'Donald Trump',  key: '3-1-0', slots: { icon: 'sub1' }},
        { title: 'Barack Obama', key: '3-1-1', scopedSlots: { icon: 'sub1' }},
        { title: 'Bill Clinton', key: '3-1-2', scopedSlots: { icon: 'sub1' }}
        ],
      }, 
      // Indonesia
      {
      title: 'Indonesia',
      key: '3-2',
      slots: {
        icon: 'indonesia' 
      },
      selectable :false, 
      children: [
        { title: 'Soekarno',  key: '3-2-0', slots: { icon: 'sub1' }},
        { title: 'Muh Hatta', key: '3-2-1', scopedSlots: { icon: 'sub1' } },
        { title: 'Soeharto', key: '3-2-2', scopedSlots: { icon: 'sub1' } }
        ],
      }, 
    ]
    }
  ];

</script>

<style>
/* recommended css code for vue-svgicon */
.svg-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    color: inherit;
    vertical-align: middle;
    fill: none;
    stroke: currentColor;
}
 
.svg-fill {
    fill: currentColor;
    stroke: none;
}
 
.svg-up {
    /* default */
    transform: rotate(0deg);
}
 
.svg-right {
    transform: rotate(90deg);
}
 
.svg-down {
    transform: rotate(180deg);
}
 
.svg-left {
    transform: rotate(-90deg);
}
</style>

