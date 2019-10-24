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
	Button
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
			code: {
				type: 'string',
				source: 'code',
				selector: 'code',
			},
		},
		edit: props => {
			
			const { attributes: { url,code },
				className, isSelected, setAttributes } = props;

			
			
			const onChangeURL = ( url ) => {
				console.log( 'changeURL',url );
				setAttributes( {url} );

				// 
				// setAttributes( {url,code:'<this is the code>'} );

			};


			const fetchLatestCode = () => {
				console.log( `getting latest file content for:${url}` );
				console.log( 'url:',url );
				setAttributes( {code:`fetched code from ${url} <script>alert('hi');</script>`} );
			};

			console.log( 'className',className );

			return (
				<div className={ className }>
					{ isSelected ? (

						<Fragment>
							<p>{ __( 'GitHub File URL', 'github-file-contents' ) }</p>
							<form
								className="blocks-format-toolbar__link-modal-line blocks-format-toolbar__link-modal-line"
								onSubmit={ event => event.preventDefault() }
							>
								<div className="github-file-contents-editor-url-input-container">
									<Tooltip text="Add Link to File in GitHub Repo">
										{icon}
									</Tooltip>
									<URLInput
										className="url"
										value={ url }
										onChange={ onChangeURL }
									/>
								</div>
								<div className="github-file-contents-editor-code-container">
									<IconButton
										icon={icon}
										label={ __( 'Fetch Latest Code', 'github-file-contents' ) }
										className={ 'button button-large' }
										onClick={ fetchLatestCode }
									>
										{__( 'Fetch Latest Code', 'github-file-contents' ) }
									</IconButton>
									<code>
										{code || __( ' Add URL and Fetch Code to Populate', 'github-file-contents' ) }
									</code>
								</div>
								<IconButton
									icon="editor-break"
									label={ __( 'Apply', 'github-file-contents' ) }
									type="submit"
								/>
							</form>
							
							
							
						</Fragment>

					) : (

						<div className="github-file-contents-content-container">
							<div className="github-file-contents-content-file-url-bar">
								<a href={url}>{url}</a>
							</div>
							<code>
								{code || __( ' Add URL and Fetch Code to Populate', 'github-file-contents' ) }
							</code>
						</div>

					)}

				</div>
			);
		},
		save: props => {
			const { attributes: { url,code } } = props;

			return (
				<div className="github-file-contents-content-container">
					<div className="github-file-contents-content-file-url-bar">
						<a href={url}>{url}</a>
					</div>
					<code>
						{code}
					</code>
				</div>
			);
		},
	},
);