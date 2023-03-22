import React, { memo } from "react";
import ReactIdswiper from "react-id-swiper";

export default memo(({ children, params }) => (
  <ReactIdswiper {...params}>{children}</ReactIdswiper>
));
