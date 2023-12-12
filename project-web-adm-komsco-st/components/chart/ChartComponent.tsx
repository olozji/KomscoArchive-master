import * as React from 'react';
import styles from '../scss/chart.module.css';

export interface IChartComponent {
  columns: Array<IColumn>;
  columns_1: Array<IColumn>;
  columns_2: Array<IColumn>;
  items: Array<any>;
  items_1: Array<any>;
  items_2: Array<any>;
}

export interface IColumn {
  header: string;
  name: string;
  link?: {
    pathname: string;
    query: any;
  };
}

const ChartComponent: React.FC<IChartComponent> = ({ ...props }: IChartComponent) => {
  console.log('Table:::::::');
  console.log(props);
  console.log(props.items);
  return (
    <>
      <div className={styles.chart_container}>
        <div className={styles.swrapper}>
          <div className={styles.title}>
            <div>
              {props.columns.map((item) => {
                return (
                  <>
                    <div className={styles.title_name}>{item.header}</div>
                  </>
                );
              })}
            </div>
          </div>
          <div className={styles.bl_table_body}>
            {props.items.map((item) => {
              return (
                <>
                  <div>
                    {props.columns.map((column) => {
                      if (column.link) {
                        return (
                          <>
                            <div>
                              <a className="hp_txt-blue">{item[column.name]}</a>
                            </div>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <div>{item[column.name]}</div>
                          </>
                        );
                      }
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <select name="" id="" className="un_pageItemSelect select_1">
          <option value="10" className={styles.item}>
            전국
          </option>
          <option value="20" className={styles.item}>
            20개씩 보기
          </option>
          <option value="30" className={styles.item}>
            30개씩 보기
          </option>
        </select>
        <select name="" id="" className={styles.un_pageItemSelect}>
          <option value="10" className={styles.item}>
            2022년
          </option>
          <option value="20" className={styles.item}>
            20개씩 보기
          </option>
          <option value="30" className={styles.item}>
            30개씩 보기
          </option>
        </select>
      </div>

      <div className={styles.chart_container}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <div>
              {props.columns_1.map((item) => {
                return (
                  <>
                    <div className={styles.title_name}>{item.header}</div>
                  </>
                );
              })}
            </div>
          </div>
          <div className={styles.bl_table_body}>
            {props.items_1.map((item) => {
              return (
                <>
                  <div>
                    {props.columns_1.map((column) => {
                      if (column.link) {
                        return (
                          <>
                            <div>
                              <a className="hp_txt-blue">{item[column.name]}</a>
                            </div>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <div>{item[column.name]}</div>
                          </>
                        );
                      }
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <select name="" id="" className="un_pageItemSelect select_1">
          <option value="10" className={styles.item}>
            전국
          </option>
          <option value="20" className={styles.item}>
            20개씩 보기
          </option>
          <option value="30" className={styles.item}>
            30개씩 보기
          </option>
        </select>
        <select name="" id="" className={styles.un_pageItemSelect}>
          <option value="10" className={styles.item}>
            2022년
          </option>
          <option value="20" className={styles.item}>
            20개씩 보기
          </option>
          <option value="30" className={styles.item}>
            30개씩 보기
          </option>
        </select>
      </div>

      <div className={styles.chart_section}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <div>
              {props.columns_2.map((item) => {
                return (
                  <>
                    <div className={styles.title_name}>{item.header}</div>
                  </>
                );
              })}
            </div>
          </div>
          <div className={styles.bl_table_body}>
            {props.items_2.map((item) => {
              return (
                <>
                  <div>
                    {props.columns_2.map((column) => {
                      if (column.link) {
                        return (
                          <>
                            <div>
                              <a className="hp_txt-blue">{item[column.name]}</a>
                            </div>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <div>{item[column.name]}</div>
                          </>
                        );
                      }
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <select name="" id="" className="un_pageItemSelect select_1">
          <option value="10" className={styles.item}>
            전국
          </option>
          <option value="20" className={styles.item}>
            20개씩 보기
          </option>
          <option value="30" className={styles.item}>
            30개씩 보기
          </option>
        </select>
        <select name="" id="" className={styles.un_pageItemSelect}>
          <option value="10" className={styles.item}>
            2022년
          </option>
          <option value="20" className={styles.item}>
            20개씩 보기
          </option>
          <option value="30" className={styles.item}>
            30개씩 보기
          </option>
        </select>
      </div>

      <style jsx>{`
        .bl_table_head {
          font-size: 1.6rem;
          line-height: 1.8rem;
          color: #282a2e;
          font-weight: 800;
          background-color: #f3f4f5;
        }
        .bl_table_head > tr > th,
        .bl_table_body > tr > td {
          padding: 20px 0;
        }
        .bl_table_body > tr > td {
          border-bottom: 0.5px solid #889196;
        }
        .bl_table_body {
          font-size: 1.5rem;
          line-height: 1.7rem;
          font-weight: 700;
        }
        .bl_table_head > tr > td,
        .bl_table_body > tr > td {
          text-align: center;
        }
        .chart_container {
          margin: 10px;
          width: 650px;
          height: 350px;
          border: 1px solid #ddd;
        }
        .chart_section {
          display: block;
        }
        .title {
          width: 100%;
          height: 50px;
          background-color: #ddd;
        }
        .title_name {
          font-size: 20px;
          line-height: 50px;
          text-align: center;
        }
        .un_pageItemSelect {
          margin: 5px;
          padding: 5px;
        }
        .select_1 {
          width: 150px;
        }
      `}</style>
    </>
  );
};

export default ChartComponent;
