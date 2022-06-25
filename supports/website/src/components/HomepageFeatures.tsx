import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '一切皆扩展',
    // TODO all: replace image
    image: '/website/img/Meta3D封面.jpg',
    description: (
      <>
       {/* 一切皆由扩展组成，扩展本身也可以再次扩展 */}
       通过组装多个扩展，积木式搭建自己的“Web3D编辑器和引擎”
      </>
    ),
  },
  {
    // title: '低代码开发',
    title: '只开发一次',
    image: '/website/img/Meta3D封面.jpg',
    description: (
      <>
        一个需求只实现一次，到处复用
       {/* 通过组装多个扩展，积木式搭建自己的“Web3D应用和引擎” */}
      </>
    ),
  },
//   {
//     title: '开放的生态',
//     image: '/website/img/Meta3D封面.jpg',
//     description: (
//       <>
// 通过分享扩展和协作开发，共建和谐共赢生态
//       </>
//     ),
//   },
  {
    title: '完全开源',
    image: '/website/img/Meta3D封面.jpg',
    description: (
      <>
      100%代码开源
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
