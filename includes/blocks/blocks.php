<?php
/**
 * Gutenberg Blocks setup
 *
* @package GithubFileContents
 */

namespace GithubFileContents\Blocks;

// use \WP_Error as WP_Error;

/**
 * Set up blocks
 *
 * @return void
 */
function setup() {
  
  $n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'enqueue_block_assets', $n( 'blocks_scripts' ) );
  add_action( 'enqueue_block_editor_assets', $n( 'blocks_editor_scripts' ),10, 2 );

	// add_filter( 'block_categories', $n( 'blocks_categories' ), 10, 2 );
}

/**
 * Enqueue shared frontend and editor JavaScript for blocks.
 *
 * @return void
 */
function blocks_scripts() {
  
	wp_enqueue_script(
		'blocks',
		GITHUB_FILE_CONTENTS_URL . 'dist/js/blocks.js',
		array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components' ),
		GITHUB_FILE_CONTENTS_VERSION,
		true
  );

}


/**
 * Enqueue editor-only JavaScript/CSS for blocks.
 *
 * @return void
 */
function blocks_editor_scripts() {

	wp_enqueue_script(
		'blocks-editor',
		GITHUB_FILE_CONTENTS_URL . '/dist/js/blocks-editor.js',
   array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components' ),
		GITHUB_FILE_CONTENTS_VERSION,
		false
  );
  
	wp_enqueue_style(
		'editor-style',
		GITHUB_FILE_CONTENTS_URL . '/dist/css/editor-style.css',
		[],
		GITHUB_FILE_CONTENTS_VERSION
	);

}

/**
 * Filters the registered block categories.
 *
 * @param array  $categories Registered categories.
 * @param object $post       The post object.
 *
 * @return array Filtered categories.
 */
function blocks_categories( $categories, $post ) {
  
  // if ( ! in_array( $post->post_type, array( 'post', 'page' ), true ) ) {
	// 	return $categories;
	// }
  
	// return array_merge(
	// 	$categories,
	// 	array(
	// 		array(
	// 			'slug'  => 'github-file-contents-blocks',
  //       'title' => __( 'GitHub File Contents', 'github-file-contents' ),
  //       'icon' => null
	// 		),
	// 	)
	// );
}
