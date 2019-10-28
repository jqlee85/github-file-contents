/**
 * GitHub File URL Block
 * 
 */
import Prism from 'prismjs';
import icon from './icon';
// import 'prismjs/themes/prism-tomorrow.css';


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
			};

			const [codeStatus,setCodeStatus] = useState( 'initial' );

			console.log( 'process.env',process.env );

			const fetchLatestCode = async () => {
				
				// TODO: Try without CORS first, and if CORS error, retry with proxyUrl
				const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
				
				setCodeStatus( 'loading' );
				try {
					const result = await fetch( proxyUrl + url );
					const resultJSON = await result.json();
					console.log( 'resultJSON',resultJSON );
					if ( resultJSON.content ) {
						const decodedContent = window.atob( resultJSON.content );
						
						const codeLanguage = 'javascript';
						// loadLanguages( [codeLanguage] );
						setCodeStatus( 'success' );
						setAttributes( {code: Prism.highlight( decodedContent, Prism.languages.javascript, 'javascript' )} );
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
										<pre><code className="language-javascript" dangerouslySetInnerHTML={{ __html: code }}/></pre>
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
								<pre><code className="language-javascript" dangerouslySetInnerHTML={{ __html: code }}/></pre>
								{/* <code>
									{code || __( ' Add URL and Fetch Code to Populate', 'github-file-contents' ) }
								</code> */}
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
						<pre><code className="language-javascript" dangerouslySetInnerHTML={{ __html: code }}/></pre>
					</div>
				</div>
				: null;
		},
	},
);