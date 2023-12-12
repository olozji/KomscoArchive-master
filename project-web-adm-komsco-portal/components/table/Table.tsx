import * as React from 'react';
import Link from 'next/link';

export interface ITable {
  columns: Array<IColumn>;
  items: Array<any>;
  isCheckbox?: boolean;
  isRadiobox?: boolean;
  className?: string;
  register?: any;
}

export interface IColumn {
  header: string | React.ReactElement;
  name: string;
  link?: {
    idName?: string;
    pathname: string;
    query: any;
  };
}

const Table: React.FC<ITable> = ({ isCheckbox = false, isRadiobox = false, ...props }: ITable) => {
  const [items, setItems] = React.useState([]);
  // console.log('Table:::::::');
  // console.log(props);
  // console.log(props.items);

  // items가 없는 경우 목업 데이터
  // const mockupData = {};
  // props.columns.forEach((item) => {
  //   mockupData[item.name] = '-';
  // });
  // React.useEffect(() => {
  //   if (props.items.length === 0) {
  //     setItems([mockupData, mockupData]);
  //   } else {
  //     setItems(props.items);
  //   }
  // }, [props.items]);

  return (
    <>
      <table className={`bl_table ${props.className}`}>
        <thead className="bl_table_head">
          <tr>
            {isCheckbox && (
              <th>
                <input type="checkbox" />
              </th>
            )}
            {isRadiobox && <th>선택</th>}

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
          {props.items.length === 0 ? (
            <tr>
              <td colSpan={props.columns.length} className="empty">
                <p>데이터가 존재하지 않습니다.</p>
              </td>
            </tr>
          ) : (
            <>
              {props.items.map((item) => {
                return (
                  <>
                    <tr>
                      {isCheckbox && (
                        <td>
                          <input type="checkbox" />
                        </td>
                      )}
                      {isRadiobox && item.value && (
                        <td>
                          <input type="radio" {...props.register(`radio`)} value={item?.value} />
                        </td>
                      )}
                      {props.columns.map((column) => {
                        if (column.link) {
                          return (
                            <>
                              <td>
                                <Link
                                  href={`${column.link.pathname}/${
                                    column.link.idName ? item[column.link.idName] : item.id
                                  }`}
                                >
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
            </>
          )}
        </tbody>
      </table>
      <style jsx>{`
        .bl_table {
          width: 100%;
        }
        .bl_table_head {
          font-size: 1.6rem;
          line-height: 1.8rem;
          color: #282a2e;
          font-weight: 800;
          background-color: #f3f4f5;
        }
        .bl_table_head > tr > th {
          vertical-align: middle;
        }
        .bl_table_head > tr > th,
        .bl_table_body > tr > td {
          padding: 20px 10px;
          word-break: keep-all;
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

        .bl_table_body > tr > .empty {
          width: 100%;
          padding: 100px 0;
          text-align: center;
          border-bottom: 0.5px solid #889196;
        }
      `}</style>
    </>
  );
};

export default Table;
