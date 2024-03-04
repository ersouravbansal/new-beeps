import React from 'react'

const MoreSwipe = () => {
  return (
    <>
    {/*======[ More info swipe up 1 ]======*/}
<div className="VdElCht_wdg VdElCht_wdg1">
  <div className="VdElCht_over-bg" />
  <div className="VdElCht_wr">
    <div className="VdElCht_cn">
      <div className="VdElCht_tp">
        <div className="VdElCht_tl-wr">
          <div className="VdElCht_tl">Comments</div>
          <div className="VdElCht_cls">
            <svg className="vj_icn vj_close">
              <use xlinkHref="#vj_close" />
            </svg>
          </div>
        </div>
        <div className="VdElCht_frm">
          <textarea placeholder="Share your thoughts" defaultValue={""} />
        </div>
        {/* </div> */}
        <div id="btm-MorInfo" className="VdElCht_btm">
          <span className="VdElCht_btn">Post
            Comment</span>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default MoreSwipe
