import {crimsonText} from '@/utils/fonts';
import Script from 'next/script';

export default function Page(){
    return (
        <>
            
            <div id="mc_embed_shell">
                <link href="https://cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css" />
                <style type="text/css">
                        {`#mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 600px;}
                        /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
                        We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */`}
                </style>
                <div id="mc_embed_signup">
                    <form action="https://gmail.us21.list-manage.com/subscribe/post?u=81970368da0e2130fb003359e&amp;id=a9cfdaf9f5&amp;f_id=0021e8e6f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank">
                        <div id="mc_embed_signup_scroll">
                            <h2 className={`${crimsonText.className}`}>Subscribe to my newsletter</h2>
                            <div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
                            <div className="mc-field-group">
                                <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
                                <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required={true} />
                            </div>
                        </div>    
                        <div id="mce-responses" className="clear foot">
                            <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
                            <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
                        </div>
                    <div className='hidden' style={{position: 'absolute', left: '-5000px'}}>
                        {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                        <input type="text" name="b_81970368da0e2130fb003359e_a9cfdaf9f5" tabIndex={-1}/>
                    </div>
                        <div className="optionalParent">
                            <div className="clear foot">
                                <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe" readOnly /> 
                            </div>
                        </div>
                    </form>
                </div>
                <Script type="text/javascript" src="https://s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></Script>
                <Script type="text/javascript" src="/mailchimp-ftypes.js"></Script>
            </div>
        </>
    )    
}