import React from "react";
import { NavLink } from 'react-router-dom';

function Disclaimers() {
    return (
        <div className="disclaimers">
            <h1 className="disclaimers-title" style={{ whiteSpace: 'pre-wrap' }}>
                Disclaimers {'\n'}
            </h1>
            <strong>
                General Disclaimer
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                The information provided by DIYesk8Guide ("we," "us," or "our") on [diyesk8guide.com] (the "Site") is for general informational and
                educational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of
                any kind, expressed or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any
                information on the Site.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Building Electric Skateboards{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                The DIY electric skateboard guide ("Guide"), board generation feature ("Generate"), artificial intelligence-assisted Q&A ("Guru"),
                and builders' photo gallery ("Gallery") are designed to serve as starting points and inspiration for your project(s). By using these
                features, you acknowledge the inherent risks involved in electric skateboard building, including personal injury and property damage.
                You agree to undertake these activities at your own risk. While the Site provides foundational knowledge, it does not encompass all
                details and safety measures required for electric skateboard building. We encourage builders to conduct their own research and consult
                with professionals or experts in the field before embarking on their build to ensure safety and compliance with all relevant
                standards.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Experimental Features{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                The "Guru" feature is experimental and may provide answers that are incorrect, incomplete, or not applicable to your specific
                questions. The Site does not guarantee the accuracy, relevance, or usefulness of any information provided by the Guru feature and
                disclaims all liability for any reliance placed on such information.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Gallery Content{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                The Gallery is a community space for sharing and inspiration. By uploading images to the Gallery, you grant DIYesk8Guide a non-exclusive,
                royalty-free license to use, display, and share your content on our platform and in related promotional materials. You retain all ownership
                rights to your content, but agree to allow it to be made public and accessible to other users and for the purposes of promoting DIYesk8Guide.
                You confirm that you own the rights to the content or have obtained necessary permissions. You also agree not to post any content that is
                unlawful, offensive, or infringes on the rights of others. The Site reserves the right to remove any content deemed inappropriate or that
                has been reported by users.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Use at Your Own Risk{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                You understand and agree that your use of the Site and its features is solely at your own risk and that you are responsible for your
                actions and their consequences. We shall not be liable for any damages or injuries that result from your use of the Site or reliance
                on the information provided on the Site. This includes, but is not limited to, your use of the Guide, Generate, Guru, and Gallery
                features.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Safety and Compliance{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Users are solely responsible for ensuring that their electric skateboard builds comply with all local, state, and national laws,
                regulations, and safety standards. DIYesk8Guide does not guarantee that the information provided will ensure compliance with such
                laws and standards. Users should conduct thorough research and consult with legal and safety experts to ensure their builds are
                lawful and safe.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Intellectual Property{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Content provided on the Site, including but not limited to text, graphics, images, and logos, are the property of DIYesk8Guide or
                used with permission. You may not reproduce, distribute, modify, or use the Site's content without our written permission.
                {'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Third-Party Links{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Our Site may contain links to third-party websites or services that are not owned or controlled by DIYesk8Guide. DIYesk8Guide has
                no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or
                services. You further acknowledge and agree that DIYesk8Guide shall not be responsible or liable, directly or indirectly, for any
                damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or
                services available on or through any such websites or services.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Modification and Interruption of Service{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                DIYesk8Guide reserves the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or
                without notice at any time. You agree that DIYesk8Guide shall not be liable to you or to any third party for any modification,
                suspension, or discontinuance of the Service.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Modification of Disclaimer{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                We reserve the right to modify these disclaimers at any time without notice. By using the Site, you agree to be bound by the
                then-current version of these disclaimers.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Contact Us{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                If you have any questions about these disclaimers, please contact us <NavLink className="contactus-href" to="/contact-us">here</NavLink>.{'\n'}{'\n'}
            </span>
            <div className="footer-bottom">
                <NavLink className="footer-bottom-link" to="/about">About</NavLink>
                <NavLink className="footer-bottom-link" to="/contact-us">Contact Us</NavLink>
                <NavLink className="footer-bottom-link" to="/donations">Donations</NavLink>
                <NavLink className="footer-bottom-link" to="/disclaimers">Disclaimers</NavLink>
                <NavLink className="footer-bottom-link" to="/rules-and-policies">Rules & Policies</NavLink>
            </div>
        </div>
    )
}

export default Disclaimers;
