# Kotlin XML DSL

## 使用

```kotlin
buildXML("root", "a" to "a", "b" to "b", "c" to "c") {
    tag("root") {
        text("AAA")
        tag("child")

        tag("child", "c" to "c") {
            tag("child")
            tag("child")
            tag("child", "c" to "c")
        }

        text("AAA")
    }
}
```

## 源码

```kotlin
typealias Property = Pair<String, String>

class XMLBuilder(
    private val name: String,
    private vararg val properties: Property
) {
    private val elements: MutableList<String> = mutableListOf()
    private fun StringBuilder.buildHead() {
        append("<$name")

        if (properties.isNotEmpty()) {
            append(" ")
        }

        properties.forEachIndexed { index, (key, value) ->
            append("""$key="$value"""")

            if (index != properties.lastIndex) {
                append(" ")
            }
        }

        append(">")
    }

    fun build() = buildString {
        buildHead()
        elements.forEach(::append)
        append("</$name>")
    }

    fun text(content: String) {
        elements.add(content)
    }

    fun tag(
        name: String,
        vararg properties: Property,
        f: XMLBuilder.() -> Unit = {}
    ) {
        val xml = buildXML(name, *properties) {
            f()
        }

        elements.add(xml)
    }
}
```