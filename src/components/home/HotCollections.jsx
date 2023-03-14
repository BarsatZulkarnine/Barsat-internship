import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Skeleton from "../UI/Skeleton";
import OwlCarousel from "react-owl-carousel";


const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState();

  

  async function getHotCollections() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    setHotCollections(data);
    setLoading(false);
  }

  useEffect(() => {
    getHotCollections();
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel className="owl.theme" {...options}>
            {loading ? (hotCollections.map((data, index) => (
              <div
                className=" "
                key={index}>
                <div className="nft_coll ">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={data.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={data.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{data.title}</h4>
                    </Link>
                    <span>ERC-{data.code}</span>
                  </div>
                </div>
              </div>
            ))):( new Array(4).fill(0).map((_, index) => (
              <div className="" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                  <Skeleton height={"100%"} width={"100%"} />
                  </div>
                  <div className="nft_coll_pp">
                  <Skeleton
                    height={"60px"}
                    width={"60px"}
                    borderRadius={"50%"}
                  />
                    
                  </div>
                  <div className="nft_coll_info">
                  <Skeleton
                    height={"20px"}
                    width={"150px"}
                    borderRadius={"8px"}
                  />
                  </div>
                  <Skeleton height={"20px"} width={"80px"} borderRadius={"8px"} />
                </div>
              </div>
            )))}
            </OwlCarousel>
          
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
