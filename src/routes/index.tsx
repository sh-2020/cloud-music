/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import Home from "../application/Home"
import Rank from "../application/Rank"
import Recommend from "../application/Recommend";
import Singers from "../application/Singers";
import Album from "../components/Album"
import Singer from "../components/Singer"

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render:()=>{
          return <Redirect to={'/recommend'}/>
        }
      },
      {
        path: "/recommend",
        component: Recommend,
        routes: [
          {
            path: "/recommend/:id",
            component: Album,
          }
        ]
      },
      {
        path: "/rank",
        component: Rank,
        routes: [
          {
            path: "/rank/:id",
            component: Album
          }
        ]
      },
      {
        path: "/singers",
        component: Singers,
        key: "singers",
        routes: [
          {
            path: "/singers/:id",
            component: Singer
          }
        ]
      },
    ]
  }

]
