require 'jekyll_asset_pipeline'

module JekyllAssetPipeline
  class CssTagTemplate < JekyllAssetPipeline::Template
    def self.filetype
      '.css'
    end

    def html
      "<link href='#{output_path}/#{@filename}' rel='stylesheet' " \
        "type='text/css' defer />\n"
    end
  end
end

module JekyllAssetPipeline
  class CssCompressor < JekyllAssetPipeline::Compressor
    require 'yui/compressor'
    require 'pry'
    require 'pry-byebug'

    def self.filetype
      '.css'
    end

    def compress
      # binding.pry
      return YUI::CssCompressor.new.compress(@content)
    end
  end

  class JavaScriptCompressor < JekyllAssetPipeline::Compressor
    require 'uglifier'

    def self.filetype
      '.js'
    end

    def compress
      Uglifier.compile(@content, harmony: true)
    end
  end
end
