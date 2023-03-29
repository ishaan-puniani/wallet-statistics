import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_HOST } from '../../constants';
import './partner_heirarchy.css'
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
export interface IPartnerHeirarchy {
    credentials?: any;
    partnerId?: string;
    hierarchyType?: "CHILDREN" | "PARENT";
    uptoPartner?: string;
    forLevel?: string;
    limit?: number;
    skip?: number;
    orderByRank?: "ASC" | "DESC";
    orderByCount?: "ASC" | "DESC";
    relativeTo?: string;
    showRaw?: boolean
}
const PartnerHeirarchy = ({
    partnerId,
    credentials,
    hierarchyType,
    uptoPartner,
    forLevel,
    limit,
    skip,
    orderByRank,
    orderByCount,
    relativeTo,
    showRaw
}: IPartnerHeirarchy) => {
    const [loading, setLoading] = useState(false);
    const [heirarchy, setHeirary] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const heirarchyResponse = await axios.post(
                `${API_HOST}/tenant/${credentials.application_id}/partners-hierarchy/${partnerId}`,
                {
                    ...credentials,
                    data: {
                        hierarchyType,
                        uptoPartner,
                        forLevel,
                        limit,
                        skip,
                        orderByRank,
                        orderByCount,
                        relativeTo,
                    },
                }
            );
            if (heirarchyResponse.data) {
                setHeirary(heirarchyResponse.data);
            }
            setLoading(false);
        };
        fetchData();
    }, [
        partnerId,
        hierarchyType,
        uptoPartner,
        forLevel,
        limit,
        skip,
        orderByRank,
        orderByCount,
        relativeTo,
    ]);
    console.log(heirarchy.slice(1))
    return (
        <div>
            <h1>{loading && <>Loading</>}</h1>
            {showRaw ? <>
                {heirarchy?.map(item => <>
                    <div className="card">
                        <SyntaxHighlighter language="javascript" style={docco}>
                            {JSON.stringify(item, null, 2)}
                        </SyntaxHighlighter>
                    </div>
                </>)}
            </> : <>
                {heirarchy.map(item => <>
                    <div className="card">
                        <ul className="timeline">
                            {/* <li>
                            <div className="card-side card-side-content">
                                <div className='title-container'>
                                    <h5 className="card-title">Invoice have been paid</h5>
                                    <h6 className='update-time'>12 min ago</h6>
                                </div>
                                <h6 className="card-subtitle">Invoice have been paid to the company</h6>
                                <div className="card-side card-side-content under-the-info" style={{ paddingLeft: "0px" }}>
                                    <div>

                                        <img src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' width='24px' height="24px" style={{ borderRadius: '25px' }} />
                                    </div>
                                    <div>
                                        <h6 className="card-side-title">Jhon Dee (Client)</h6>
                                    </div>
                                </div>
                            </div>
                        </li> */}
                            <li>
                                <div className="card-side card-side-content">
                                    <div className='title-container'>
                                        <h5 className="card-title">{item?.additionalData?.fullName.replace(/_/, " ")}</h5>
                                        <h6 className='update-time'>Level: <span style={{ color: 'blue' }}>{item?.level}</span></h6>
                                    </div>
                                    {
                                        item?.partnerName && <h6 className="card-subtitle">Partner Name: {item?.partnerName}</h6>
                                    }
                                    <div className="card-side card-side-content under-the-info" style={{ paddingLeft: "0px" }}>
                                        {/* <div>

                                        <img src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' width='24px' height="24px" style={{ borderRadius: '25px' }} />
                                    </div> */}
                                        <div>

                                            <h6 className="card-side-title">{item?.additionalData?.email}</h6>
                                            <p className="card-side-subtitle">{item?.additionalData?.phoneNumber}</p>
                                        </div>
                                    </div>
                                    {item?.childrenCount && <>
                                        <div className='member-count-container'>
                                            {
                                                item?.childrenCount - 3 > 0 && <>
                                                    <div className="card-side card-side-content under-the-info" style={{ paddingLeft: "0px", marginTop: '0px' }}>
                                                        <div className='partner-team-img-container'>
                                                            <div className='single-member-img' style={{ zIndex: '999', }} >
                                                                <img src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' width='24px' height="24px" />
                                                            </div>
                                                            <div className='single-member-img' style={{ marginLeft: '-10px', zIndex: '99' }}>
                                                                <img src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' width='24px' height="24px" />
                                                            </div>
                                                            <div className='single-member-img' style={{ marginLeft: '-10px', zIndex: '9' }}>
                                                                <img src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' width='24px' height="24px" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            {<div style={{ color: 'blue', fontWeight: '700' }}>{item?.childrenCount}</div>}

                                        </div>
                                    </>}
                                </div>
                            </li>
                            {/* <li>
                            <div className="card-side card-side-content">
                                <div className='title-container'>
                                    <h5 className="card-title">Invoice have been paid</h5>
                                    <h6 className='update-time'>12 min ago</h6>
                                </div>
                                <h6 className="card-subtitle">Invoice have been paid to the company</h6>
                                <div className="card-side card-side-content under-the-info" style={{ paddingLeft: "0px" }}>
                                    <div className='partner-team-img-container'>
                                        <div className='single-member-img' style={{ zIndex: '999', }} >
                                            <img src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' width='24px' height="24px" />
                                        </div>
                                        <div className='single-member-img' style={{ marginLeft: '-10px', zIndex: '99' }}>
                                            <img src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' width='24px' height="24px" />
                                        </div>
                                        <div className='single-member-img' style={{ marginLeft: '-10px', zIndex: '9' }}>
                                            <img src='https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg' width='24px' height="24px" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li> */}
                        </ul>
                    </div>
                </>)}
            </>}
        </div >
    );
};

export default PartnerHeirarchy;