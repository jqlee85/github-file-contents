/**
 * GitHub File URL Block
 * 
 */

import icon from './icon';

const { __ } = wp.i18n;
const { Fragment,useState } = wp.element;
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
				setFetchedCode( 'setFetchedCode' );
			};

			const [codeStatus,setCodeStatus] = useState( 'initial' );

			console.log( 'process.env',process.env );

			const fetchLatestCode = async () => {
				
				if ( 'development' === process.env.REACT_APP_ENV ) console.log( 'development env' );
				else console.log( 'NOT development env' );

				// TODO: Remove proxyUrl, or pull from a plugin setting
				const proxyUrl = ( 'development' !== process.env.REACT_APP_ENV ) ? 'https://cors-anywhere.herokuapp.com/' : '';
				
				setCodeStatus( 'loading' );
				try {
					const result = await fetch( proxyUrl + url );
					const resultJSON = await result.json();
					if ( resultJSON.content ) {
						const decodedContent = window.atob( resultJSON.content );
						setCodeStatus( 'success' );
						setAttributes( {code: decodedContent} );
					} else {
						throw { message:'No Content Found' };
					}
					
					// setAttributes( {code:`fetched code from ${url} <script>alert('hi');</script>`} );
				} catch ( error ) {
					setCodeStatus( 'error' );
					console.error( error );
					
				}
			};

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
								<div className="github-file-contents-content-container">
									<IconButton
										icon={icon}
										label={ __( 'Fetch Latest Code', 'github-file-contents' ) }
										className={ 'button button-large' }
										onClick={ fetchLatestCode }
									>
										{__( 'Fetch Latest Code', 'github-file-contents' ) }
									</IconButton>
									<div className="github-file-contents-code-container github-file-contents-editor-code-container">
										<code>
											{code || __( ' Add URL and Fetch Code to Populate', 'github-file-contents' ) }
										</code>
									</div>
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
							<div className="github-file-contents-code-container">
								<code>
									{code || __( ' Add URL and Fetch Code to Populate', 'github-file-contents' ) }
								</code>
							</div>
						</div>

					)}

				</div>
			);
		},
		save: props => {
			const { attributes: { url,code } } = props;


			return code ? 
				<div className="github-file-contents-content-container">
					<div className="github-file-contents-content-file-url-bar">
						<a href={url}>{url}</a>
					</div>
					<div className="github-file-contents-code-container">
						<code>
							{code}
						</code>
					</div>
				</div>
				: null;
		},
	},
);