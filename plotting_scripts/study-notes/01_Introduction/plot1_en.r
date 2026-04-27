library(tidyverse)

sans_font <- "Inter"
serif_font <- "STIX Two Text"
inter_font <- "/Users/larry/Library/Fonts/Inter.ttc"

if (requireNamespace("systemfonts", quietly = TRUE) && file.exists(inter_font)) {
    tryCatch(
        systemfonts::register_font(
            name = sans_font,
            plain = inter_font,
            bold = inter_font,
            italic = inter_font
        ),
        error = function(e) {
            if (!grepl("already exists", conditionMessage(e), fixed = TRUE)) {
                stop(e)
            }
        }
    )
}

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

df <- df |>
    mutate(
        feedback = factor(feedback, levels = c("Encouraging", "Neutral", "Critical")),
        difficulty = factor(difficulty, levels = c("Easy", "Difficult"))
    )

cell_means <- df |>
    group_by(feedback, difficulty) |>
    summarise(mean_performance = mean(performance), .groups = "drop")

plot_palette <- c(
    "Easy" = "#2B8CBE",
    "Difficult" = "#E34A33"
)

plot1 <- ggplot(cell_means, aes(x = feedback, y = mean_performance, group = difficulty)) +
    geom_hline(yintercept = 0, color = "#A8B0B8", linewidth = 0.4) +
    geom_line(aes(color = difficulty, linetype = difficulty), linewidth = 1) +
    geom_point(aes(color = difficulty, shape = difficulty), size = 3.2, stroke = 1.1) +
    scale_color_manual(values = plot_palette) +
    scale_linetype_manual(values = c("Easy" = "solid", "Difficult" = "22")) +
    scale_shape_manual(values = c("Easy" = 16, "Difficult" = 17)) +
    labs(
        x = "Feedback type",
        y = "Mean performance improvement",
        color = "Task difficulty",
        linetype = "Task difficulty",
        shape = "Task difficulty"
    ) +
    theme_classic(base_size = 12, base_family = serif_font) +
    theme(
        axis.title = element_text(family = sans_font, size = 12.5),
        axis.text = element_text(color = "#263238"),
        axis.line = element_line(color = "#5E6A71", linewidth = 0.45),
        axis.ticks = element_line(color = "#5E6A71", linewidth = 0.35),
        legend.position = "top",
        legend.title = element_text(family = sans_font),
        legend.text = element_text(family = serif_font),
        panel.grid.major.y = element_line(color = "#E4E8EB", linewidth = 0.35),
        plot.background = element_rect(fill = "white", color = NA),
        panel.background = element_rect(fill = "white", color = NA)
    )

if (interactive() || dev.cur() > 1) {
    print(plot1)
}

output_file <- file.path(getwd(), "plot1.svg")
grDevices::svg(output_file, width = 7, height = 4.8, bg = "white", onefile = FALSE)
print(plot1)
grDevices::dev.off()
