import * as React from 'react';
import Link from 'next/link';

export interface ITable {
  columns: Array<IColumn>;
  items: Array<any>;
}

export interface IColumn {
  header: string;
  name: string;
  link?: {
    pathname: string;
    query: any;
  };
}

const Table: React.FC<ITable> = ({ ...props }: ITable) => {
  console.log('Table:::::::');
  console.log(props);
  console.log(props.items);
  return (
    <>
      <table className="bl_table">
        <colgroup>
          {props.columns.map((item) => {
            return (
              <>
                <col width="200px" />
              </>
            );
          })}
        </colgroup>
        <thead className="bl_table_head">
          <tr>
            {props.columns.map((item) => {
              return (
                <>
                  <th>{item.header}</th>
                </>
              );
            })}
          </tr>
        </thead>
        <tbody className="bl_table_body">
          {props.items.map((item) => {
            return (
              <>
                <tr>
                  {props.columns.map((column) => {
                    if (column.link) {
                      return (
                        <>
                          <td>
                            <Link href={`${column.link.pathname}/${item.id}`}>
                              <a className="hp_txt-blue">{item[column.name]}</a>
                            </Link>
                          </td>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <td>{item[column.name]}</td>
                        </>
                      );
                    }
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
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
      `}</style>
    </>
  );
};

export default Table;
