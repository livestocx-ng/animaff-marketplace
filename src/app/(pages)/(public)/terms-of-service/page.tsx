import Footer from '@/components/navigation/footer';
import MainNavbar from '@/components/navigation/main-nav-bar';
import React, {Fragment} from 'react';

const TermsOfServicePage = () => {
	return (
		<Fragment>
			<MainNavbar />
			<main>
				<section className='h-[50vh] md:h-[50vh] w-full bg-home flex flex-col items-center justify-center pt-28 md:pt-0'>
					<h1 className='text-xl md:text-5xl font-medium text-white'>
						Terms Of Service
					</h1>
				</section>

				<div className='w-full py-10 px-4 md:px-8 flex flex-col space-y-5'>
					<h1 className='text-sm font-semibold'>
						Last Updated on: 15th May, 2024.
					</h1>

					<p className='text-sm leading-7'>
						These terms and conditions (“Agreement”) outline the
						fundamental terms and regulations governing your
						utilization of the livestocx.com.ng, livestocx.com
						website (“Website” or “Service”) and any associated
						products and services which includes, but not limited to
						Livestocx App (“Services”). This Agreement establishes a
						legally binding relationship between you (“User”, “you”,
						or “your”) and the operator of this Website (“Operator”,
						“we”, “us”, or “our”). Should you be entering into this
						agreement on behalf of a business or other legal entity,
						you confirm that you possess the authorization to
						legally bind said entity to this agreement. In such
						cases, the terms “User”, “you”, or “your” shall pertain
						to the aforementioned entity. If you lack the necessary
						authority or disagree with the stipulations of this
						agreement, you must decline acceptance and refrain from
						accessing or using the Website and Services. Through
						accessing and employing the Website and Services, you
						acknowledge that you have perused, comprehended, and
						consented to abide by the conditions of this Agreement.
						It’s important to acknowledge that this Agreement stands
						as a legally binding pact between you and the Operator,
						even though it exists in electronic format and lacks a
						physical signature. This Agreement governs your
						engagement with and utilization of the Website and
						Services.
					</p>

					<ol className='list-decimal space-y-5 px-4'>
						<li className='text-sm leading-7'>
							Privacy and Data Protection: We are committed to
							protecting your privacy and handling your personal
							information in accordance with our Privacy Policy.
							By using the website, you consent to the collection,
							use, and disclosure of your data as described in the
							Privacy Policy.
						</li>
						<li className='text-sm leading-7'>
							Intellectual Property Rights: “Intellectual Property
							Rights” encompass all current and future
							entitlements granted through legal statutes, common
							law, or equity, pertaining to copyrights and related
							rights, trademarks, designs, patents, inventions,
							goodwill, and the ability to take legal action
							against passing off. This includes rights to
							inventions, rights to use, and all other forms of
							intellectual property rights, whether registered or
							unregistered. This covers applications for rights,
							the right to claim priority, and equivalent forms of
							protection, as well as any other outcomes of
							intellectual creativity existing or to exist
							globally. This Agreement does not transfer any
							intellectual property owned by the Operator or third
							parties to you. The rights, titles, and interests in
							such property will exclusively remain with the
							Operator. The trademarks, service marks, graphics,
							and logos used in conjunction with the Website and
							Services are trademarks or registered trademarks of
							the Operator or its licensors. Additional
							trademarks, service marks, graphics, and logos
							linked to the Website and Services might belong to
							other third parties. Your use of the Website and
							Services does not grant you the right or license to
							reproduce or use any of the Operator’s or
							third-party trademarks unless otherwise granted by
							Livestocx Agritech Solutions LTD.
						</li>
						<li className='text-sm leading-7'>
							Limitation of Liability: Livestocx Agritech
							Solutions LTD shall not be held liable for any
							damages, injuries, or losses arising from your use
							of the Website or Services, or reliance on any
							information provided through the Website or
							Services. To the broadest extent allowed by the law
							applicable, under no circumstances shall the
							Livestocx Agritech Solutions LTD, along with its
							affiliates, directors, officers, employees, agents,
							suppliers, or licensors, be held accountable to any
							individual for any consequential, indirect,
							incidental, punitive, special, or cover damages
							(including, but not restricted to, damages for lost
							profits, revenue, sales, goodwill, content
							utilization, business impact, business interruption,
							foregone savings, loss of business opportunities)
							regardless of the cause, whether arising from
							contract, tort, warranty, breach of statutory duty,
							negligence, or any other legal theory, even if the
							party in question had been notified of the
							possibility of such damages or could have
							anticipated them.
						</li>
						<li className='text-sm leading-7'>
							Modification and Termination: Livestocx Agritech
							Solutions LTD reserves the right to modify, suspend,
							or terminate the Website or Services at any time,
							with or without notice. We may also update these
							Terms to reflect any changes in our services or
							legal requirements.
						</li>
						<li className='text-sm leading-7'>
							User-Generated Material: We do not possess any data,
							information, or materials (collectively referred to
							as “Content”) that you provide while utilizing the
							Service on the Website or Services. The accuracy,
							quality, integrity, legality, reliability,
							appropriateness, and ownership or rights to use all
							submitted Content rest solely with you. The Content
							submitted or generated by you on the Website or
							Services may be monitored and reviewed by us. By
							using our Website or Services, you grant us the
							permission to access, copy, distribute, store,
							transmit, reformat, display, and perform the Content
							associated with your user account, strictly for the
							purpose of delivering value to you. While we don’t
							have an obligation to do so, we retain the right to
							exercise our discretion and, if deemed necessary,
							reject or eliminate any Content that, in our
							reasonable judgment, breaches any of our policies or
							is considered harmful or objectionable.
							Additionally, you provide us with a license to
							utilize, reproduce, adapt, modify, publish, or
							distribute the Content you create or store in your
							user account for commercial, marketing, or similar
							purposes.
						</li>
						<li className='text-sm leading-7'>
							Indemnity: You agree to indemnify, and hold
							Livestocx Agritech Solutions LTD and its affiliates,
							directors, officers, employees, agents, and
							licensors without harm form against any liabilities,
							losses, costs, or damages including reasonable
							attorney’s fees spent in connection with or arising
							from any third party allegations, claims, disputes,
							or demands asserted against any of them as a result
							of or relating to your Content, and use of the
							Website or willful misconduct.
						</li>
						<li className='text-sm leading-7'>
							Governing Law and Jurisdiction: These Terms are
							governed by and construed in accordance with the
							laws of Nigeria. Any dispute arising from or
							relating to these Terms shall be subject to the
							exclusive jurisdiction of the Nigerian courts.
						</li>
					</ol>

					<p className='text-sm leading-7'>
						Please read these Terms carefully before using the
						Website. By using the Website, you signify your
						acceptance of these Terms.
					</p>
				</div>
			</main>
			<Footer />
		</Fragment>
	);
};

export default TermsOfServicePage;
