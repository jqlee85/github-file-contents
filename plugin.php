<?php
/**
 * Plugin Name: GithubFileContents
 * Plugin URI: https://github.com/jqlee85/github-file-contents
 * Description: Syncs contents of files in a GitHub repo to WordPress posts
 * Version:     0.1.0
 * Author:      jqlee85
 * Author URI:  https://jumpoff.io
 * Text Domain: github-file-contents
 * Domain Path: /languages
 *
 * @package GithubFileContents
 */

// Useful global constants.
define( 'GITHUB_FILE_CONTENTS_VERSION', '0.1.0' );
define( 'GITHUB_FILE_CONTENTS_URL', plugin_dir_url( __FILE__ ) );
define( 'GITHUB_FILE_CONTENTS_PATH', plugin_dir_path( __FILE__ ) );
define( 'GITHUB_FILE_CONTENTS_INC', GITHUB_FILE_CONTENTS_PATH . 'includes/' );

// Include files.
require_once GITHUB_FILE_CONTENTS_INC . 'functions/core.php';
require_once GITHUB_FILE_CONTENTS_INC . 'blocks/blocks.php';


// Activation/Deactivation.
register_activation_hook( __FILE__, '\GithubFileContents\Core\activate' );
register_deactivation_hook( __FILE__, '\GithubFileContents\Core\deactivate' );

// Bootstrap.
GithubFileContents\Core\setup();
GithubFileContents\Blocks\setup();

// Require Composer autoloader if it exists.
if ( file_exists( GITHUB_FILE_CONTENTS_PATH . '/vendor/autoload.php' ) ) {
	require_once GITHUB_FILE_CONTENTS_PATH . 'vendor/autoload.php';
}
