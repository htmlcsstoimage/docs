require 'jekyll_asset_pipeline'

module JekyllAssetPipeline
  class CssTagTemplate < JekyllAssetPipeline::Template
    def self.filetype
      '.css'
    end

    def html
      file_path = "#{output_path}/#{@filename}"

      # Load all CSS files directly as stylesheets
      "<link href='#{file_path}' rel='stylesheet' type='text/css' />\n"
    end
  end
end

module JekyllAssetPipeline
  class JsTagTemplate < JekyllAssetPipeline::Template
    def self.filetype
      '.js'
    end

    def html
      file_path = "#{output_path}/#{@filename}"

      if @filename.match? "highlighting"
        return "<script src='#{file_path}' async defer type='text/javascript'></script>\n" \
      end

      "<script src='#{file_path}' type='text/javascript'></script>\n" \
    end
  end
end

module JekyllAssetPipeline
  class CssCompressor < JekyllAssetPipeline::Compressor
    require 'yui/compressor'

    def self.filetype
      '.css'
    end

    def compress
      return @content
      # return YUI::CssCompressor.new.compress(@content)
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
