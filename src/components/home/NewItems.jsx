import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import OwlCarousel from "react-owl-carousel";
import CountDownClock from "../UI/CountDownClock";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();

  async function getItems() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getItems();
  }, []);

  const options = {
    nav: true,
    loop: true,
    items: 4,
    margin: 15,
    dots: false,
    stagePadding: 10,
    responsive: {
      0: { items: 1 },
      470: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl.theme" {...options}>
            {!loading
              ? items.map((data, index) => (
                  <div className="" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${data.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas">
                          <img className="lazy" src={data.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <CountDownClock data={data.expiryDate} />
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <Link to={`/item-details/${data.nftId}`}>
                          <img
                            src={data.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${data.nftId}`}>
                          <h4>{data.title}</h4>
                        </Link>
                        <div className="nft__item_price">{data.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{data.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : new Array(4).fill(0).map((_, index) => (
                  <div className="" key={index}>
                    <div className="nft__item">
                      <div className="nft__item_wrap">
                        <Skeleton width={"100%"} height={"90%"} />
                      </div>
                      <div className="nft__item_info">
                        <Skeleton width={"64px"} height={"16px"} />
                        <div className="nft__item_price">
                          <Skeleton width={"48px"} height={"16px"} />
                        </div>
                        <div className="nft__item_like">
                          <Skeleton width={"16px"} height={"12px"} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
