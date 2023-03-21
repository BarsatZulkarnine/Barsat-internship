import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [seller, setseller] = useState([]);
  const [loading, setLoading] = useState();

  async function getseller() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    setseller(data);
    setLoading(false);
  }

  useEffect(() => {
    getseller();
  }, []);

  console.log(seller);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {!loading
                ? seller.map((data, index) => (
                    <li key={data.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${data.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={data.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{data.authorName}</Link>
                        <span>{data.price} ETH</span>
                      </div>
                    </li>
                  ))
                : new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          height={"50px"}
                          width={"100%"}
                          borderRadius={"50%"}
                        />

                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                      <Skeleton
                          height={"16px"}
                          width={"96px"}
          
                        />
                         <Skeleton
                          height={"16px"}
                          width={"48px"}
          
                        />
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
