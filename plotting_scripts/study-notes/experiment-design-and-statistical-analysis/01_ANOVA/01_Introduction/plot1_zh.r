library(tidyverse)

primary_sans_font <- "Inter"
primary_serif_font <- "STIX Two Text"
fallback_sans_font <- "Noto Sans CJK SC"
fallback_serif_font <- "Noto Serif CJK SC"
sans_font <- fallback_sans_font
serif_font <- fallback_serif_font
inter_font <- "/Users/larry/Library/Fonts/Inter.ttc"
noto_sans_cjk_font <- "/Users/larry/Library/Fonts/NotoSansCJKsc-Regular.otf"
noto_serif_cjk_font <- "/Users/larry/Library/Fonts/NotoSerifCJKsc-Regular.otf"

register_font_if_available <- function(name, path) {
    if (!requireNamespace("systemfonts", quietly = TRUE) || !file.exists(path)) {
        return(invisible(FALSE))
    }

    tryCatch(
        {
            systemfonts::register_font(
                name = name,
                plain = path,
                bold = path,
                italic = path
            )
            invisible(TRUE)
        },
        error = function(e) {
            if (!grepl("already exists", conditionMessage(e), fixed = TRUE)) {
                stop(e)
            }
            invisible(FALSE)
        }
    )
}

register_font_if_available(primary_sans_font, inter_font)
register_font_if_available(fallback_sans_font, noto_sans_cjk_font)
register_font_if_available(fallback_serif_font, noto_serif_cjk_font)

df <- tribble(
    ~replicate, ~difficulty, ~feedback, ~performance,
    1, "Easy", "Encouraging", 3.2,
    2, "Easy", "Encouraging", 5.1,
    3, "Easy", "Encouraging", 4.8,
    4, "Easy", "Encouraging", 6.5,
    5, "Easy", "Encouraging", 2.9,
    6, "Easy", "Encouraging", 5.0,
    7, "Easy", "Encouraging", 6.2,
    8, "Easy", "Encouraging", 4.1,
    9, "Easy", "Encouraging", 7.3,
    10, "Easy", "Encouraging", 4.9,
    1, "Easy", "Neutral", 8.5,
    2, "Easy", "Neutral", 11.2,
    3, "Easy", "Neutral", 9.8,
    4, "Easy", "Neutral", 12.1,
    5, "Easy", "Neutral", 7.9,
    6, "Easy", "Neutral", 10.5,
    7, "Easy", "Neutral", 11.8,
    8, "Easy", "Neutral", 9.1,
    9, "Easy", "Neutral", 10.0,
    10, "Easy", "Neutral", 9.1,
    1, "Easy", "Critical", 24.5,
    2, "Easy", "Critical", 26.2,
    3, "Easy", "Critical", 25.8,
    4, "Easy", "Critical", 27.1,
    5, "Easy", "Critical", 23.9,
    6, "Easy", "Critical", 25.5,
    7, "Easy", "Critical", 26.8,
    8, "Easy", "Critical", 24.1,
    9, "Easy", "Critical", 25.0,
    10, "Easy", "Critical", 26.1,
    1, "Difficult", "Encouraging", 23.5,
    2, "Difficult", "Encouraging", 26.1,
    3, "Difficult", "Encouraging", 24.8,
    4, "Difficult", "Encouraging", 27.2,
    5, "Difficult", "Encouraging", 22.9,
    6, "Difficult", "Encouraging", 25.5,
    7, "Difficult", "Encouraging", 26.8,
    8, "Difficult", "Encouraging", 24.1,
    9, "Difficult", "Encouraging", 23.9,
    10, "Difficult", "Encouraging", 25.2,
    1, "Difficult", "Neutral", 9.5,
    2, "Difficult", "Neutral", 8.2,
    3, "Difficult", "Neutral", 11.8,
    4, "Difficult", "Neutral", 7.1,
    5, "Difficult", "Neutral", 12.9,
    6, "Difficult", "Neutral", 10.5,
    7, "Difficult", "Neutral", 9.2,
    8, "Difficult", "Neutral", 10.8,
    9, "Difficult", "Neutral", 10.0,
    10, "Difficult", "Neutral", 10.0,
    1, "Difficult", "Critical", -4.5,
    2, "Difficult", "Critical", -6.2,
    3, "Difficult", "Critical", -5.8,
    4, "Difficult", "Critical", -7.1,
    5, "Difficult", "Critical", -3.9,
    6, "Difficult", "Critical", -5.5,
    7, "Difficult", "Critical", -6.8,
    8, "Difficult", "Critical", -4.1,
    9, "Difficult", "Critical", -5.0,
    10, "Difficult", "Critical", -6.1
)

df_zh <- df |>
    mutate(
        feedback = factor(
            case_match(
                as.character(feedback),
                "Encouraging" ~ "鼓励", "Neutral" ~ "中性", "Critical" ~ "批评"
            ),
            levels = c("鼓励", "中性", "批评")
        ),
        difficulty = factor(
            case_match(
                as.character(difficulty),
                "Easy" ~ "简单", "Difficult" ~ "困难"
            ),
            levels = c("简单", "困难")
        )
    )

cell_means_zh <- df_zh |>
    group_by(feedback, difficulty) |>
    summarise(mean_performance = mean(performance), .groups = "drop")

palette_zh <- c("简单" = "#2B8CBE", "困难" = "#E34A33")

plot_zh <- ggplot(cell_means_zh, aes(x = feedback, y = mean_performance, group = difficulty)) +
    geom_hline(yintercept = 0, color = "#A8B0B8", linewidth = 0.4) +
    geom_line(aes(color = difficulty, linetype = difficulty), linewidth = 1) +
    geom_point(aes(color = difficulty, shape = difficulty), size = 3.2, stroke = 1.1) +
    scale_color_manual(values = palette_zh) +
    scale_linetype_manual(values = c("简单" = "solid", "困难" = "22")) +
    scale_shape_manual(values = c("简单" = 16, "困难" = 17)) +
    labs(
        x = "反馈类型",
        y = "平均成绩提升",
        color = "任务难度",
        linetype = "任务难度",
        shape = "任务难度"
    ) +
    theme_classic(base_size = 12, base_family = serif_font) +
    theme(
        axis.title         = element_text(family = sans_font, size = 12.5),
        axis.text          = element_text(color = "#263238"),
        axis.text.y        = element_text(family = primary_serif_font, color = "#263238"),
        axis.line          = element_line(color = "#5E6A71", linewidth = 0.45),
        axis.ticks         = element_line(color = "#5E6A71", linewidth = 0.35),
        legend.position    = "top",
        legend.title       = element_text(family = sans_font),
        legend.text        = element_text(family = serif_font),
        panel.grid.major.y = element_line(color = "#E4E8EB", linewidth = 0.35),
        plot.background    = element_rect(fill = "white", color = NA),
        panel.background   = element_rect(fill = "white", color = NA)
    )

pdf_output_file <- "plot_zh.pdf"

grDevices::cairo_pdf(pdf_output_file, width = 7, height = 4.8, family = serif_font, bg = "white")
print(plot_zh)
grDevices::dev.off()
