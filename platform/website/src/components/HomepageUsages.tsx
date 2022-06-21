import React from 'react';
import clsx from 'clsx';
import styles from './HomepageUsages.module.css';

type UsageItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const UsageList: UsageItem[] = [
  {
    title: 'Web3D编辑器',
    // TODO all: replace image
    image: '/website/img/Meta3D封面.jpg',
    description: (
      <>
        {/* 如编辑器、智慧城市、游戏等各种类型的Web3D应用 */}
      </>
    ),
  },
  {
    // title: '低代码开发',
    title: 'Web3D引擎',
    image: '/website/img/Meta3D封面.jpg',
    description: (
      <>
        {/* 通过组合多个扩展来开发自己定制化的Web3D引擎 */}
      </>
    ),
  },
  // {
  //   title: '智慧城市、游戏等Web3D应用',
  //   image: '/website/img/Meta3D封面.jpg',
  //   description: (
  //     <>
  //       {/* 如编辑器、智慧城市、游戏等各种类型的Web3D应用 */}
  //     </>
  //   ),
  // },
];

function Usage({ title, image, description }: UsageItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.usageSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageUsages(): JSX.Element {
  return (
    <section className={styles.usages}>
      <h1 className={styles.header}>Meta3D能开发什么？</h1>
      <div className="container">
        <div className="row">
          {UsageList.map((props, idx) => (
            <Usage key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
