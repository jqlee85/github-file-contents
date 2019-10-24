// //import foo from './bar'
// /**
//  * GitHub File Contents Block
//  * 
//  */
// import { __ } from '@wordpress/i18n';
// // import { TextControl } from '@wordpress/components';
// import { registerBlockType } from '@wordpress/blocks';

// /**
//  * Register block
//  */
// export default registerBlockType(
// 	'jumpoff/github-file-contents',
// 	{
// 		title: __( 'GitHub File Contents', 'jumpoff' ),
// 		description: __( 'GitHub File Contents To Sync', 'jumpoff' ),
// 		icon: 'smiley',
// 		category: 'github-file-contents-blocks',
// 		keywords: [
// 			__( 'example', 'github-file-contents' ),
// 		],
// 		attributes: {
// 			customTitle: {
// 				type: 'string'
// 			},
// 		},
// 		/**
// 		 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
// 		 */
// 		edit: props => {
// 			const {
// 				attributes: {
// 					customTitle
// 				},
// 				className,
// 				setAttributes,
// 				isSelected
// 			} = props;

// 			if ( isSelected ) {
// 				return (
// 					<div className={ className }>
// 						<input
// 							id="github-file-contents-block-text-field"
// 							type="text"
// 							label={ __( 'Custom Title', 'jumpoff' ) }
// 							value={ customTitle }
// 							onChange={ customTitle => setAttributes( { customTitle } ) }
// 						/>
// 					</div>
// 				);
// 			} else {
// 				return (
// 					<h2 class="github-file-contents-block-title">
// 						{ customTitle }
// 					</h2>
// 				);
// 			}
// 		},
// 		/**
// 		 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#save
// 		 */
// 		save: props => {
// 			const {
// 				customTitle
// 			} = props.attributes;

// 			return (
// 				<h2 class="github-file-contents-block-title">
// 					{ customTitle }
// 				</h2>
// 			);
// 		},
// 	},
// );

// console.log( 'admin.js ran' );