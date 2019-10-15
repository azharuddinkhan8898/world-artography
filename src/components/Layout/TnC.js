import React from 'react';
import {Modal} from 'react-bootstrap'
import {getDataUri} from './../utils/codeSnippet'
import $ from 'jquery';

export default class TnC extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state  = {
        show: false
      }
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount(){
      this.setState({
        show:this.props.show
      })
    }
  
    handleClose(sub) {
      this.setState({ show: false });
      this.props.tncCloseHandler();
    }
  
    handleShow() {
      this.setState({ show: true });
    }



    

   



  
    render() {
  
      return (
          
  
          <Modal show={this.state.show} onHide={this.handleClose} className="home-modal">
          
          <div className="close-modal" data-dismiss="modal" onClick={() => this.handleClose()}></div>

          <div className="modal-body">
    <div className="container-fluid inner-pages"><h1 className="h3 mb-4 text-gray-800">Terms &amp; Condition</h1><br/><ol className="bullet-1"><li>The promoter is World Artography whose registered London, United Kingdom.</li><li>We may sub-contract the provision of the Services or any part of them at our discretion.</li><li>The competition is open to everyone aged over 18.</li><li>Minimum pixel purchase is necessary to enter this competition.</li><li>By entering this competition, an entrant is indicating his/her agreement to be bound by these terms and conditions.</li><li>The route to entry for the competition and details of how to enter are via www.worldartography.com</li><li>Maximum 5 entries will be accepted per person. </li><li>Closing date for entry will be once the pixel grid is 100% full. After this, no further entries to the competition will be permitted. Until the grid has not been 100% filled announcement of the winners will not take place.</li><li>No responsibility can be accepted for entries not received for whatever reason.</li><li>World Artography reserves the right to cancel or amend the competition/prizes and these terms and conditions without notice and will not be legally liable for any loss. No legal proceedings can be initiated against World Artography, Directors, Founders or Employees.</li><li> Any changes to the competition will be notified on the website.</li><li> World Artography is not responsible for inaccurate prize details supplied to any entrant by any third party connected with this competition.</li><li> The prize is as follows: 5 Categories (Wildlife/Nature - Landscape - Travel/Street - Portrait - Aerial Photography). Please refer to Prize Page for a breakdown of the prizes.</li><li> The prize is as stated and no other alternatives will be offered. Prizes subject to all the pixels sold out. Or the competition will be null &amp; void. The prizes are not transferable. Prizes are subject to availability and we reserve the right to substitute any prize with another of equivalent value without giving notice.</li><li> Winners will be chosen: by Promoter and or its agents, as a result of a popular vote conducted via social media sites as measured and recorded and verified by Promoter and or its agents and also by an independent adjudicator or panel of judges appointed by the Promoter.</li><li> The winner will be notified by email and by letter within 28 days of the closing date. If the winner cannot be contacted or do not claim the prize within 14 days of notification, we reserve the right to withdraw the prize from the winner and pick a replacement winner.</li><li> World Artographys decision in respect of all matters to do with the competition will be final and no correspondence will be entered into.</li><li> By entering this competition, an entrant is indicating his/her agreement to be bound by these terms and conditions.</li><li> The winner agrees to the use of his/her name and image in any publicity material, as well as their entry. Any personal data relating to the winner or any other entrants will be used solely in accordance with current [UK] data protection legislation and will not be disclosed to a third party without the entrant’s prior consent.</li><li> The winner’s name will be available 28 days after closing date by emailing the following address: admin@worldartography.com</li><li>Entry into the competition will be deemed as acceptance of these terms and conditions.</li><li> This promotion is in no way sponsored, endorsed or administered by, or associated with, Facebook, Twitter or any other Social Network. You are providing your information to World Artography and not to any other party. </li><li> Except as expressly permitted by the section above or the other provisions of these terms and conditions, you must not download any material from our website or save any such material to your computer. You may only use our website for your own personal and business purposes, and you must not use our website for any other purposes. Except as expressly permitted by these terms and conditions, you must not edit or otherwise modify any material on our website. Unless you own or control the relevant rights in the material, you must not: (a) republish material from our website (including republication on another website); (b) sell, rent or sub-license material from our website; (c) exploit material from our website for a commercial purpose; or (D) redistribute material from our website.</li><li> We reserve the right to restrict access to areas of our website, or indeed our whole website, at our discretion; you must not circumvent or bypass, or attempt to circumvent or bypass, any access restriction measures on our website.</li><li> You must not: (a) use our website in any way or take any action that causes, or may cause, damage to the website or impairment of the performance, availability or accessibility of the website; (b) use our website in any way that is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity;</li><li> You must ensure that all the information you supply to us through our website, or in relation to our website, is true, accurate, current, complete and non-misleading.</li><li> Entrants may register for an account with our website by completing and submitting the account registration form on our website.</li><li> You must not use any other person’s account to access the website unless you have that person’s express permission to do so.</li><li> World Artography is to be used solely for non-commercial purposes. You may not use the World Artography to publish Materials containing any advertisements or solicitations for funds, good or services.</li><li> You may not post Material that is defamatory, obscene, hateful, harassing, or discriminatory, or that is a violation of any law, including those protecting privacy, publicity, trade secrets, copyrights, and trademarks.</li><li> World Artography is not under any obligation to monitor the Materials residing on or transmitted to its Media; however, World Artography may, at its discretion and without warning, modify, remove or reject any posted Materials for any reason, including to prevent the violation of World Artography’s rights or the rights of other parties, to comply with any law, regulation or other government request, or to operate its sites properly.</li><li> By posting, uploading or transmitting Material (including photographs) to World Artography website, you represent and warrant that you are the sole owner of all rights in the posted Materials (including all copyrights) and/or that you have the right to license the Material to World Artography for all the uses contemplated herein; and no part to the Materials will infringe upon or violate any publicity, privacy, patent, copyright, trademark, or other proprietary rights of any third parties. </li><li> By posting, uploading or transmitting Materials on or through World Artography, you hereby grant World Artography a worldwide, royalty-free, non-exclusive, irrevocable, perpetual, license to use, reproduce, modify, publish, publicly perform, publicly display, distribute, sublicense and create derivative works based on the Material in any form or media now known or hereafter developed for any purpose, including commercial use.</li><li> You may not link to, post, upload, or transmit any software or other Material that contains a virus or other harmful malicious code. You may not use World Artography website to distribute chain letters, mass mailings, or spam or to gather email addresses for the purpose of sending spam to other users</li><li>World Artography shall have the right, at its sole discretion and at any time, to change or modify these terms and conditions, such change shall be effective immediately upon posting to this webpage.</li><li> World Artography also reserves the right to cancel the competition if circumstances arise outside of its control.</li><li> In no event will World Artography, its directors, officers, employees, attorneys, agents, and representatives be responsible or liable for any damages or losses of any kind, including direct indirect, incidental, consequential or punitive damages arising out of Entrant’s participation in the Competition.</li></ol></div>

</div>
          
          </Modal>
      );
    }
  }