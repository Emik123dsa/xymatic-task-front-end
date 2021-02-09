import React, { Fragment, useMemo } from 'react';
import { DisLikeIcon } from '@/components/Icons/Dislike';
import { LikeIcon } from '@/components/Icons/Like';
import schema from '@styles/_schema.scss';
import { List } from 'immutable';
// import { coercedSortCtor } from '~/app/shared/coerced.sort';
import _ from '../Actions.scss';
import { classnames } from '~/app/shared/coerced.classnames';

const ImpressionPost = (data) => null;
// const findAllImpressions = data?.data;

// if (!List.isList(findAllImpressions)) return null;

// const sortedImpressions = useMemo(() => coercedSortCtor(findAllImpressions), [
//   findAllImpressions,
// ]);

// return (
//   <Fragment>
//     <table className={_['actions-table']}>
//       <thead className={_['actions-table_header']}>
//         <tr className={_['actions-label']}>
//           <td>Author name</td>
//           <td>Post title</td>
//           <td>Attitude</td>
//           <td>Created date</td>
//         </tr>
//       </thead>
//       <tbody className={_['actions-table_body']}>
//         {sortedImpressions &&
//           sortedImpressions.map((item, index) => (
//             <tr key={`${index}-${item.get('id')}`}>
//               <td className={_['actions-table_title']}>
//                 <span>
//                   {index + 1}
//                   &#46;
//                 </span>
//                 &nbsp;{item?.getIn(['author', 'name'])}
//               </td>
//               <td
//                 className={classnames(
//                   schema['d-flex'],
//                   schema['align-center'],
//                 )}
//               >
//                 {item?.getIn(['post', 'title'])}
//               </td>
//               <td>
//                 {item.get('attitude').startsWith('LIKE') ? (
//                   <LikeIcon />
//                 ) : (
//                   <DisLikeIcon />
//                 )}
//               </td>
//               <td>{item.get('createdAt')}</td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   </Fragment>
// );
export default React.memo(ImpressionPost);
