import React from 'react'
import App from 'next/app'
import Header from '../components/Header'
import Footer from '../components/Footer'
import classNames from 'classnames'

import '../layout/global.css'
import styles from '../layout/layout.module.css'

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props

    return (
      <>
        <Header />
        <div className={classNames(styles.wrapper, styles.grow)}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </>
    )
  }
}
