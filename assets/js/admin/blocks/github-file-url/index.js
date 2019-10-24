/**
 * GitHub File URL Block
 * 
 */

import icon from './icon';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { 
	registerBlockType 
} = wp.blocks;
const {
	URLInput,
} = wp.editor;
const {
	IconButton,
	Tooltip,
} = wp.components;

/**
 * Register block
 */
export default registerBlockType(
	'github-file-contents/github-file-url',
	{
		title: __( 'GitHub File URL', 'github-file-contents' ),
		description: __( 'URL of file in GitHub repo', 'github-file-contents' ),
		category: 'embed',
		icon: {
			src: icon,
		},         
		keywords: [
			__( 'Link', 'github-file-contents' ),
			__( 'GitHub', 'github-file-contents' ),
			__( 'Code', 'github-file-contents' ),
		],
		attributes: {
			url: {
				type: 'string',
				source: 'attribute',
				attribute: 'href',
				selector: 'a',
			},
		},
		edit: props => {
			const { attributes: { url },
				className, isSelected, setAttributes } = props;
			return (
				<div className={ className }>
					{ isSelected ? (

						<Fragment>
							<p>{ __( 'GitHub File URL', 'github-file-contents' ) }</p>
							<form
								className="blocks-format-toolbar__link-modal-line blocks-format-toolbar__link-modal-line"
								onSubmit={ event => event.preventDefault() }
							>
								<div className="github-file-contents-url-input-container">
									<Tooltip text="Add Link to File in GitHub Repo">
										{icon}
									</Tooltip>
									<URLInput
										className="url"
										value={ url }
										onChange={ url => setAttributes( { url } ) }
									/>
								</div>
								<IconButton
									icon="editor-break"
									label={ __( 'Apply', 'github-file-contents' ) }
									type="submit"
								/>
							</form>
						</Fragment>

					) : (

						<p>
							{url}
						</p>

					)}

				</div>
			);
		},
		save: props => {
			const { attributes: { url } } = props;

			return (
				<p>
					{url}
				</p>
			);
		},
	},
);