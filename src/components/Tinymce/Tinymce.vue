<template>
  <div class="zcl-editor-content">
    <textarea :id="editor_id" v-model="editorContent"></textarea>
  </div>
</template>
<script>

    import UTILS from '../../utils/utils'
    import store from '../../store';

    const tinymce = window.tinymce

    if (!tinymce) {
        throw new Error('找不到 tinymce ')
    }

    export default {
        name: 'tinymce',
        props: {
            // 默认值
            defaultValue: {
                type: String
            },
            width: {
                type: Number,
                default: 610
            },
            height: {
                type: Number,
                default: 400
            }
        },
        data () {
            return {
                // 编辑器随机ID
                editor_id: UTILS._randomWord(false, 16),
                // 初始化内容
                editorContent: this.defaultValue
            }
        },
        watch: {
            defaultValue (val) {
                this.editorContent = val
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.initEditor()
            })
        },
        methods: {
            initEditor () {
                const self = this
                // tinymce 的初始化里面的方法并不能直接用箭头写法来挂载this
                // 启用插件列表
                const plugins = [ 'advlist autolink lists link image imagetools charmap textcolor print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table contextmenu paste code table codesample visualblocks visualchars directionality lineheight' ]
                // 菜单栏列表
//      const toolbar = 'code | undo redo | insert | styleselect formatselect fontselect fontsizeselect | bold italic underline strikethrough  | forecolor backcolor emoticons |  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table | codesample | preview media print fullscreen | ltr rtl visualchars visualblocks'
                // 编辑框使用的样式
                const contentCss = [
                    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                    '//www.tinymce.com/css/codepen.min.css']
                tinymce.init({
                    selector: `#${this.editor_id}`,
                    skin: 'atzcl',
//        width: this.width,
                    height: this.height,
                    plugins: plugins,
//        menubar: false, // 菜单上面的功能下拉栏
                    toolbar1: 'code | undo redo | insert | styleselect formatselect fontselect fontsizeselect lineheightselect',
                    toolbar2: 'bold italic underline strikethrough  | forecolor backcolor emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
                    toolbar3: 'link image | table | codesample | preview media | ltr rtl visualchars visualblocks ',
                    content_css: contentCss, // 编辑框使用的样式
                    language: 'zh_CN', // 语言
                    image_title: true, // 图片标题
                    lineheight_formats: '1 1.5 1.6 1.7 1.75 2 3 4 5 6', // 行间距
                    fontsize_formats: '12px 13px 14px 15px 18px 20px 22px 24px', // 字体
                    image_caption: true, // 开启插入图片的字幕功能
                    imagetools_cors_hosts: [],
                    convert_urls: false, // 不进行 URL 转化 // 文档：https://www.tinymce.com/docs/demo/url-conversion/
                    imagetools_proxy: '/system/v1/image_tools',
                    images_upload_url: 'http://localhost:8088/api/matters/image/upload',
                    images_reuse_filename: true, // 给后端原始的文件名称
                    // 创建本地上传钩子
                    file_picker_callback: (cb, value, meta) => {
                        // 创建一个上传按钮 dom
                        let input = document.createElement('input')
                        // 设置上传按钮的 type 属性
                        input.setAttribute('type', 'file')
                        // 设置上传按钮的 accept 属性
                        input.setAttribute('accept', 'image/png, image/jpeg, image/gif')

                        // 监听上传行为
                        input.onchange = function () {
                            let file = this.files[0]
                            let reader = new FileReader()
                            reader.readAsDataURL(file)
                            reader.onload = function () {
                                let id = 'blobid' + (new Date()).getTime()
                                let blobCache = tinymce.activeEditor.editorUpload.blobCache
                                let base64 = reader.result.split(',')[1]
                                let blobInfo = blobCache.create(id, file, base64)
                                blobCache.add(blobInfo)
                                //     // 插入 blob 图像
                                cb(blobInfo.blobUri(), { title: file.name })
                            }
                        }
                        input.click()
                    },
                    images_upload_handler: function (blobInfo, success, failure) {  // 监听编辑器的上传行为，主要是为了控制上面钩子的插入本地图片
                        let xhr, formData
                        xhr = new XMLHttpRequest()
                        xhr.withCredentials = false
                        xhr.open('POST', process.env.BASE_API + '/api/matters/image/upload')
                        xhr.setRequestHeader("Authorization", store.getters.token);
                        xhr.onload = function () {
                            let json
                            if (xhr.status !== 200) {
                                failure('网络错误: ' + xhr.status)
                                return
                            }
                            json = JSON.parse(xhr.responseText)

                            console.log(json);
                            if (!json || json.returnCode !== 200) {
                                failure(json.returnMsg)
                                return
                            }
                            // 这里使用 convert_urls: false 解决了
                            success(json.returnData)
                        }

                        formData = new FormData()
                        formData.append('file', blobInfo.blob(), blobInfo.filename())

                        xhr.send(formData)
                    },
                    // 指定每次初始化编辑器实例时要执行的函数名称,editor是编辑器实例对象的引用
                    init_instance_callback: (editor) => {
                        editor.on('NodeChange Change KeyUp', () => {
                            // 返回编辑器的原始内容
//            this.$emit('update:defaultValue', editor.getContent({ format: 'raw' }))
                            // 返回编辑器的 HTML 内容
                            this.$emit('update:defaultValue', editor.getContent())
                        })
                    }
                })
            }
        },
        destroyed () {
            tinymce.get(this.editor_id).destroy()
        }
    }
</script>

<style type="text/css">
  .zcl-editor-content {
    padding-right: 2px;
  }

  .zcl-editor-content .mce-tinymce {
    border-radius: 4px;
    overflow: hidden
  }

  .zcl-editor-content  figure.image {
    display: inline-block;
    border: 1px solid gray;
    margin: 0 2px 0 1px;
    background: #f5f2f0;
  }

  .zcl-editor-content  figure.align-left {
    float: left;
  }

  .zcl-editor-content  figure.align-right {
    float: right;
  }

  .zcl-editor-content  figure.image img {
    margin: 8px 8px 0 8px;
  }

  .zcl-editor-content  figure.image figcaption {
    margin: 6px 8px 6px 8px;
    text-align: center;
  }
</style>
