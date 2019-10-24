//import foo from './bar'
/**
 * GitHub File Contents Block
 * 
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { TextControl } = wp.components;

/**
 * Register block
 */
registerBlockType(
	'github-file-contents/github-file-contents',
	{
		title: __( 'GitHub File Contents!!!!', 'github-file-contents' ),
		description: __( 'GitHub File Contents To Sync', 'github-file-contents' ),
		// icon: 'smiley',
		category: 'github-file-contents-blocks',
		keywords: [
			__( 'example', 'github-file-contents' ),
		],
		attributes: {
			customTitle: {
				type: 'string'
			},
		},
		/**
		 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
		 */
		edit: props => {
			const {
				attributes: {
					customTitle
				},
				className,
				setAttributes,
				isSelected
			} = props;

			if ( isSelected ) {
				return (
					<div className={ className }>
						<TextControl
							id="github-file-contents-block-text-field"
							label={ __( 'Custom Title', 'jumpoff' ) }
							value={ customTitle }
							onChange={ customTitle => setAttributes( { customTitle } ) }
						/>
					</div>
				);
			} else {
				
				const list = [];
				for ( let i=0;10>i;i++ ) {
					list.push( customTitle );
				}
				
				return (
					<div>
						{list.forEach( item=>{
							console.log( 'item',item );
							return <h2 class="github-file-contents-block-title">
								{ item }
							</h2>;
	
						} )
						}
					</div>
				);
			}
		},
		/**
		 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#save
		 */
		save: props => {
			const {
				customTitle
			} = props.attributes;

			const list = [];
			for ( let i=0;10>i;i++ ) {
				list.push( customTitle );
			}

			return (
				<div>
					{list.forEach(item=>{
						console.log( 'item',item );
						return <h2 class="github-file-contents-block-title">
							{item}
						</h2>;

					} )
					}
				</div>
			);
		},
	},
);

console.log( 'index.js ran' );