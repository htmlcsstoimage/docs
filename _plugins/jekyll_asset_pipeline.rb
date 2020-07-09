require 'jekyll_asset_pipeline'

module JekyllAssetPipeline
  class CssTagTemplate < JekyllAssetPipeline::Template
    def self.filetype
      '.css'
    end

    def html
      file_path = "#{output_path}/#{@filename}"

      if @filename.match? "jtd"
        return "<link href='#{file_path}' rel='stylesheet' " \
                  "type='text/css' async />\n" \
      end

      "<link href='#{file_path}' rel='preload' " \
        "type='text/css' async />\n" \
      "<link rel='preload' href='#{file_path}' as='style' onload=\"this.onload=null;this.rel='stylesheet'\"> " \
        "<noscript><link rel='stylesheet' href='#{file_path}'></noscript>"
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
    require 'pry'
    require 'pry-byebug'

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
