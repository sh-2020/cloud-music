import BScroll from '@better-scroll/core'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import ObserveDOM from '@better-scroll/observe-dom'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import React, { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react'
import Loading from '../Loading'
import s from "./style.module.scss"
import LoadingV2 from "../Loading-v2"
import useDebounce from '../../hooks/useDebounce'

export interface ScrollProps {
  prop?: any;
  onPullup?: Function;
  onPulldown?: Function;
  onScroll?: Function;
  direction: "vertical" | "horizental";
  refresh?: boolean;
  pullDownRefresh?: Object;
  pullUpLoad?: Object;
  pullUpLoading ?: boolean
  pullDownLoading ?: boolean;
  bounceTop?: boolean
  [name: string]: any
}

const Scroll: React.FC<ScrollProps> = forwardRef<HTMLDivElement, ScrollProps> (({   
  direction,
  onPullup,
  onPulldown,
  onScroll,
  children,
  pullDownRefresh = {
    threshold: 70,
    stop: 0
  },
  pullUpLoad = {
    threshold: 90,
    stop: 10
  },
  pullDownLoading=false,
  pullUpLoading=false,
  bounceTop=true,
  refresh= true}, ref) => {
  BScroll.use(ObserveDOM)
  BScroll.use(MouseWheel)
  BScroll.use(ScrollBar)
  BScroll.use(PullDown)
  BScroll.use(Pullup)
  const wrapRef = useRef<HTMLDivElement>(null)
  const initRef = useRef(false)
  const [scrollObj, setScrollObj] = useState<BScrollConstructor>()
  const upDebounce = useDebounce({ fn: onPullup, delay: 300})
  const downDebounce = useDebounce({fn: onPulldown, delay: 300})
  const initBScroll = () => {
    setScrollObj(
      new BScroll(wrapRef.current as HTMLDivElement, {
        scrollX: direction === "horizental",
        scrollY: direction === "vertical",
        probeType: 3,
        click: true,
        observeDOM: true,
        bounce: {
          top: bounceTop,
          bottom: false,
          // left: false,
          // right: false
        },
        // scrollbar: true, // ???????????????
        useTransition: true, // ????????????
        //  ????????????
        pullDownRefresh: pullDownRefresh,
        //  ??????????????????
        pullUpLoad: pullUpLoad
      })
    )
  }
  // ???????????????
  useEffect(()=>{
    initBScroll()
    return () =>{
      scrollObj?.destroy()  // ????????????????????????
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect (() => {
    if (refresh && scrollObj){
      scrollObj.refresh ();
    }
  });
  // ????????????
  useEffect (() => {
    if (!scrollObj || !onPulldown) return;
    scrollObj.on ('touchEnd', (pos: { y: number }) => {
      // ???????????????????????????
      if (pos.y > 50) {
        downDebounce ();
      }
    });
    return () => {
      scrollObj.off ('touchEnd');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downDebounce, scrollObj]);

  useEffect (() => {
    if (!scrollObj || !onPullup) return;
    scrollObj.on ('scrollEnd', () => {
      // ??????????????????????????????
      if (scrollObj.y <= scrollObj.maxScrollY + 100){
        upDebounce();
      }
    });
    return () => {
      scrollObj.off ('scrollEnd');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upDebounce, scrollObj]);

  useEffect (() => {
    if (!scrollObj || !onScroll) return;
    scrollObj.on ('scroll', (scroll: any) => {
      onScroll (scroll);
    })
    return () => {
      scrollObj.off ('scroll');
    }
  }, [onScroll, scrollObj]);

  // ??????????????????
  useEffect(()=>{
    if (initRef.current === true) {

    } else {
      initRef.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useImperativeHandle<HTMLDivElement, any>(ref, ()=>({
    refresh(){
      if(scrollObj) {
        scrollObj.refresh();
        scrollObj.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if(scrollObj) {
        return scrollObj;
      }
    },
  }))

  const PullUpdisplayStyle = pullUpLoading ? { display: ""} : {display: "none"}
  const PullDowndisplayStyle = pullDownLoading ? { display: ""} : {display: "none"}

  return (
    <div ref={wrapRef} style={{ height: "100%", width: "100%",overflow: 'hidden' }}>
        { children }
        {/* ???????????????????????? */}  
        <div className={s.PullUpLoading} style={ PullUpdisplayStyle }>
          <Loading></Loading>
        </div>
        {/* ???????????????????????? */}
        <div className={s.PullDownLoading} style={ PullDowndisplayStyle }>
          <LoadingV2></LoadingV2>
        </div>
    </div>
  )
})

export default Scroll
