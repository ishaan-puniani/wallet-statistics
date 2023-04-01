import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_HOST } from '../../constants';
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styled from 'styled-components';
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
        <PartnerHeirarchyWrapper>
            <div className='heirachy-container'>
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
            </div>
        </PartnerHeirarchyWrapper>
    );
};

const PartnerHeirarchyWrapper = styled.div`
.heirachy-container{
    @media screen and (max-width: 425px) {
        margin:10px
    }
}
.card {
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px;
    max-width: 400px;    
    margin-bottom: 10px;
    @media screen and (max-width: 425px) {
        max-width:100%;
        padding: 10px;
      }
  }
.title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .update-time {
    margin: 0;
    color: gray;
  }
  .vertical-divider {
    width: 1px;
    height: 100%;
    background-color: #ccc;
    display: inline-block;
    margin: 0 10px;
  }
  
  .card-side {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
  }
  
  .card-side-icon {
    flex-basis: 6%;
  }
  
  .card-side-content {
    flex-basis: 94%;
    padding-left: 20px;
  }
  
  .vertical-line {
    width: 2px;
    height: 40%;
    background-color: gray;
    margin-bottom: 10px;
  }
  
  .card-title {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
  
  .card-subtitle {
    margin: 0;
    font-size: 16px;
    font-weight: normal;
    color: gray;
    margin-top: 10px;
  }
  
  .card-side-title {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
  }
  
  .card-side-subtitle {
    margin: 0;
    font-size: 14px;
    font-weight: normal;
    color: gray;
  }
  .under-the-info {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .partner-team-img-container {
    display: flex;
  }
  .single-member-img {
    border: 2px solid white;
    border-radius: 25px;
  }
  .single-member-img img {
    border-radius: 25px;
  }
  .timeline {
    position: relative;
    margin: 10px 0;
    padding: 0;
    list-style: none;
    counter-reset: section;
    @media screen and (max-width: 425px) {
        width:100%;
      }
  }
  .timeline:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #ff3e1d;
    left: 8px;
    margin: 0;
    border-radius: 2px;
  }
  .timeline > li {
    position: relative;
    margin-right: 10px;
    margin-bottom: 15px;
    box-sizing: border-box;
    padding-left: 15px;
    width: 400px;
    @media screen and (max-width: 425px) {
        width:100%;
      }
  }
  .timeline > li:before,
  .timeline > li:after {
    display: block;
  }
  
  .timeline > li:before {
    counter-increment: section;
    content: counter(section);
    background: #ff3e1d;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    border-radius: 50%;
    left: -1px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ff3e1d;
    font-size: 22px;
    font-weight: bold;
    border: 0px solid #fff;
    box-sizing: border-box;
  }
  .timeline > li:after {
    clear: both;
  }
  
  .member-count-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
    gap: 5px;
  }
  .member-count-container:first-child {
    flex-basis: 0;
  }
  .under-the-info {
    flex-basis: 0;
  }
  
  
`;

export default PartnerHeirarchy;